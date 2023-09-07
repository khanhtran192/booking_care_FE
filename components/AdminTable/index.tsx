import { PaginationData } from "@/axiosClient/types";
import { useAuth } from "@/lib/AuthProvider";
import {
	CheckOutlined,
	CloseOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Button, Table, TableProps, Tag } from "antd";
import { Axios } from "axios";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useCallback, useEffect, useMemo, useState } from "react";
import AppConfirm from "../AppConfirm";

export interface AdminTableProps<T extends object> extends TableProps<T> {
	getApi: (
		axiosAuth: Axios,
		query: Record<string, any>
	) => Promise<PaginationData<T>>;
	toggleApi?: (axiosAuth: Axios, record: T) => Promise<any>;
	onCreate?: (() => void) | boolean;
	onEdit?: (record: T) => void;
	getMoreActions?: (axiosAuth: Axios, record: T) => React.ReactNode;
}

function AdminTable<T extends object>({
	columns,
	pagination,
	getApi,
	toggleApi,
	onCreate = true,
	onEdit,
	getMoreActions,
	...props
}: AdminTableProps<T>) {
	const router = useRouter();
	const { axiosAuth } = useAuth();

	const [res, setRes] = useState<PaginationData<T>>({} as any);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await getApi(axiosAuth, router.query);
				setRes(response);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		fetchData();
	}, [axiosAuth, getApi, router.query]);

	const handleEdit = useCallback(
		(record: T) => {
			if (!onEdit) {
				return router.push(`${router.route}/${record.id}/edit`);
			}
			return onEdit(record);
		},
		[onEdit, router]
	);

	const tableCols = useMemo(() => {
		if (!columns) return [];

		const newCols = [...columns];
		if (typeof toggleApi === "function") {
			newCols.push({
				title: "Trạng thái",
				dataIndex: "active",
				render: (active: boolean) => {
					return (
						<Tag color={active ? "success" : "error"}>
							{active ? "Đang hoạt động" : "Đã vô hiệu hóa"}
						</Tag>
					);
				},
			});
		}
		newCols.push({
			width: 100,
			key: "action",
			render: (_, record: any) => {
				const text = record.active ? "Vô hiệu hóa" : "Kích hoạt";
				return (
					<div className="flex">
						<Button
							icon={<EditOutlined />}
							onClick={() => handleEdit(record)}
							type="link"
						/>
						{typeof toggleApi === "function" && (
							<AppConfirm
								title={text}
								onConfirm={async () => {
									try {
										await toggleApi(axiosAuth, record);
										router.replace(router.asPath);
									} catch (error) {}
								}}>
								{record.active ? (
									<Button icon={<CloseOutlined />} danger type="link" />
								) : (
									<Button
										icon={<CheckOutlined />}
										type="link"
										color="success"
									/>
								)}
							</AppConfirm>
						)}
						{getMoreActions?.(axiosAuth, record)}
					</div>
				);
			},
		});
		return newCols;
	}, [columns, toggleApi, getMoreActions, axiosAuth, handleEdit]);

	const tableProps = useMemo(() => {
		const newProps: any = { ...props };
		const { data, ...rest } = Array.isArray(res) ? { data: res } : res;
		if (pagination === false) {
			newProps.pagination = false;
			newProps.dataSource = data;
		} else {
			newProps.pagination = {
				...pagination,
				showQuickJumper: true,
				showSizeChanger: true,
				...rest,
			};
			newProps.dataSource = data;
		}
		return newProps;
	}, [pagination, props, res]);

	const handleTableChange = useCallback<
		NonNullable<AdminTableProps<T>["onChange"]>
	>(
		(pagination, _, sorter) => {
			const newParams: Record<string, any> = {
				page: (pagination.current ?? 1) - 1,
				size: pagination.pageSize,
			};

			router.replace(
				`${router.route}?${queryString.stringify(newParams, {
					skipEmptyString: true,
					skipNull: true,
				})}`
			);
		},
		[router]
	);

	const handleCreate = useCallback(() => {
		if (typeof onCreate === "function") {
			return onCreate();
		}
		return router.push(`${router.route}/add`);
	}, [onCreate, router]);

	return (
		<div>
			<div className="">
				{onCreate && (
					<Button
						icon={<PlusOutlined />}
						type="primary"
						className="mb-4"
						onClick={handleCreate}>
						Create
					</Button>
				)}
			</div>
			<Table
				onChange={handleTableChange}
				columns={tableCols}
				loading={loading}
				{...tableProps}
			/>
		</div>
	);
}

export default AdminTable;

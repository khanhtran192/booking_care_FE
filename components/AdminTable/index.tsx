import { PaginationData } from "@/axiosClient/types";
import { useAuth } from "@/lib/AuthProvider";
import {
	CheckOutlined,
	CloseOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { App, Button, Popconfirm, Table, TableProps, Tag } from "antd";
import { Axios } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface AdminTableProps<T extends object> extends TableProps<T> {
	getApi: (
		axiosAuth: Axios,
		query: Record<string, any>
	) => Promise<PaginationData<T>>;
	toggleApi?: (axiosAuth: Axios, record: T) => Promise<any>;
}

function AdminTable<T extends object>({
	columns,
	pagination,
	getApi,
	toggleApi,
	...props
}: AdminTableProps<T>) {
	const router = useRouter();
	const { axiosAuth } = useAuth();
	const { message } = App.useApp();

	const [res, setRes] = useState<PaginationData<T>>({} as any);
	const [loading, setLoading] = useState(false);
	const { data, ...rest } = res;
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

	const tableCols = useMemo(() => {
		if (!columns) return [];

		const newCols = [...columns];
		newCols.push(
			{
				title: "Trạng thái",
				dataIndex: "active",
				render: (active: boolean) => {
					return (
						<Tag color={active ? "success" : "error"}>
							{active ? "Đang hoạt động" : "Đã vô hiệu hóa"}
						</Tag>
					);
				},
			},
			{
				width: 100,
				key: "action",
				render: (_, record: any) => {
					const text = record.active ? "Vô hiệu hóa" : "Kích hoạt";
					return (
						<div className="flex">
							<Link href={`${router.route}/${record.id}/edit`}>
								<Button icon={<EditOutlined />} type="link" />
							</Link>
							{typeof toggleApi === "function" && (
								<Popconfirm
									title={text}
									description="Bạn có chắc chắn không?"
									okText="Có"
									cancelText="Không"
									onConfirm={async () => {
										try {
											await toggleApi(axiosAuth, record);
											message.success(text + " thành công!");
											router.reload();
										} catch (error) {
											console.log("error :", error);
											message.error(text + " thất bại!");
										}
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
								</Popconfirm>
							)}
						</div>
					);
				},
			}
		);
		return newCols;
	}, [axiosAuth, columns, message, router, toggleApi]);

	const tablePagination = useMemo(() => {
		return {
			showQuickJumper: true,
			showSizeChanger: true,
			...rest,
		};
	}, [rest]);

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

	return (
		<div>
			<div className="">
				<Button
					icon={<PlusOutlined />}
					type="primary"
					className="mb-4"
					onClick={() => {
						router.push(`${router.route}/add`);
					}}>
					Create
				</Button>
			</div>
			<Table
				onChange={handleTableChange}
				columns={tableCols}
				pagination={tablePagination}
				loading={loading}
				dataSource={data}
				{...props}
			/>
		</div>
	);
}

export default AdminTable;

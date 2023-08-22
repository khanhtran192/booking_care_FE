import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Button, Popconfirm, Table, TableProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useMemo, useCallback } from "react";

export interface AdminTableProps<T extends object> extends TableProps<T> {
	handleDelete?: (record: T) => Promise<void>;
}

function AdminTable<T extends object>({
	columns,
	handleDelete,
	pagination,
	...props
}: AdminTableProps<T>) {
	const router = useRouter();
	const { message } = App.useApp();

	const tableCols = useMemo(() => {
		if (!columns) return [];

		const newCols = [...columns];
		newCols.push({
			width: 100,
			key: "action",
			render: (_, record) => (
				<>
					<Link href={`${router.route}/${(record as any).id}/edit`}>
						<Button icon={<EditOutlined />} type="link" />
					</Link>
					{typeof handleDelete === "function" && (
						<Popconfirm
							title="Xóa dữ liệu"
							description="Bạn có chắc chắn muốn xóa bản ghi này?"
							okText="Chắc chắn"
							cancelText="Không"
							onConfirm={async () => {
								try {
									await handleDelete(record);
									message.success("Xóa dữ liệu thành công!");
									router.reload();
								} catch (error) {
									message.error("Xóa dữ liệu thất bại!");
								}
							}}>
							<Button icon={<DeleteOutlined />} danger type="link" />
						</Popconfirm>
					)}
				</>
			),
		});
		return newCols;
	}, [columns, handleDelete, message, router]);

	const tablePagination = useMemo(() => {
		return {
			showQuickJumper: true,
			showSizeChanger: true,
			...pagination,
		};
	}, []);

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
				{...props}
			/>
		</div>
	);
}

export default AdminTable;

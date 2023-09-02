import { orderApi } from "@/axiosClient/endpoints";
import { OrderInfo } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AppConfirm from "@/components/AppConfirm";
import AdminLayout from "@/components/layout/AdminLayout";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tag, message, type TableColumnsType } from "antd";
import { Axios } from "axios";
import { useCallback } from "react";

type Status = "PENDING" | "APPROVED" | "REJECTED" | "CANCELED" | "COMPLETE";
const statusProps: Record<
	Status,
	{
		color: string;
		children: string;
		cancelable?: boolean;
	}
> = {
	PENDING: {
		color: "warning",
		children: "Chờ xác nhận",
		cancelable: true,
	},
	APPROVED: {
		color: "success",
		children: "Đã xác nhận",
		cancelable: true,
	},
	REJECTED: {
		color: "error",
		children: "Bị từ chối",
		cancelable: true,
	},
	CANCELED: {
		color: "error",
		children: "Đã hủy",
	},
	COMPLETE: {
		color: "success",
		children: "Đã hoàn thành",
	},
};

export const renderOrderTag = (status: keyof typeof statusProps) => {
	return <Tag {...statusProps[status]} />;
};

const columns: TableColumnsType<OrderInfo> = [
	{
		title: "Ngày",
		dataIndex: "date",
		render: (date, { timeSlot }) => `${date} ${timeSlot.time}`,
	},
	{
		title: "Địa chỉ",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Triệu chứng",
		dataIndex: "symtom",
	},
	{
		title: "Giá tiền",
		dataIndex: "price",
	},
	{
		title: "Trạng thái",
		dataIndex: "status",
		render: renderOrderTag,
	},
];

function ManageHospitalsPage() {
	const getMoreActions = useCallback((axiosAuth: Axios, record: OrderInfo) => {
		if (record.status && !statusProps[record.status as Status].cancelable) {
			return;
		}
		return (
			<AppConfirm
				title="Hủy đơn"
				onConfirm={async () => orderApi.cancel(axiosAuth, record.id)}>
				<Button type="link" icon={<DeleteOutlined />} danger />
			</AppConfirm>
		);
	}, []);
	return (
		<AdminLayout>
			<AdminTable
				creatable={false}
				columns={columns}
				getApi={(axiosAuth, query) => orderApi.getOrders(axiosAuth, query)}
				getMoreActions={getMoreActions}
			/>
		</AdminLayout>
	);
}

export default ManageHospitalsPage;

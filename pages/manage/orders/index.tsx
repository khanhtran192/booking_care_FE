import { orderApi } from "@/axiosClient/endpoints";
import { OrderInfo } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AppConfirm from "@/components/AppConfirm";
import AdminLayout from "@/components/layout/AdminLayout";
import { ORDER_STATUS } from "@/global/constants";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tag, type TableColumnsType } from "antd";
import { Axios } from "axios";
import { useCallback } from "react";

export const statusProps: Record<
	ORDER_STATUS,
	{
		color: string;
		children: string;
		cancelable?: boolean;
	}
> = {
	[ORDER_STATUS.PENDING]: {
		color: "warning",
		children: "Chờ xác nhận",
		cancelable: true,
	},
	[ORDER_STATUS.APPROVED]: {
		color: "success",
		children: "Đã xác nhận",
		cancelable: true,
	},
	[ORDER_STATUS.REJECTED]: {
		color: "error",
		children: "Bị từ chối",
		cancelable: true,
	},
	[ORDER_STATUS.CANCELED]: {
		color: "error",
		children: "Đã hủy",
	},
	[ORDER_STATUS.COMPLETE]: {
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
		if (
			record.status &&
			!statusProps[record.status as ORDER_STATUS].cancelable
		) {
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
				onCreate={false}
				columns={columns}
				getApi={(axiosAuth, query) => orderApi.getOrders(axiosAuth, query)}
				getMoreActions={getMoreActions}
			/>
		</AdminLayout>
	);
}

export default ManageHospitalsPage;

import { orderApi } from "@/axiosClient/endpoints";
import { OrderInfo } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import { Tag, type TableColumnsType } from "antd";

const statusProps = {
	PENDING: {
		color: "warning",
		children: "Chờ xác nhận",
	},
	APPROVED: {
		color: "success",
		children: "Đã xác nhận",
	},
	REJECTED: {
		color: "error",
		children: "Bị từ chối",
	},
	CANCELED: {
		color: "error",
		children: "Đã hủy",
	},
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
		render: (status: keyof typeof statusProps) => {
			return <Tag {...statusProps[status]} />;
		},
	},
];

function ManageHospitalsPage() {
	const { user } = useAuth();
	return (
		<AdminLayout>
			<AdminTable
				creatable={false}
				columns={columns}
				getApi={(axiosAuth, query) => orderApi.getOrders(axiosAuth, query)}
			/>
		</AdminLayout>
	);
}

export default ManageHospitalsPage;

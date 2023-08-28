import { orderApi } from "@/axiosClient/endpoints";
import { OrderInfo } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import type { TableColumnsType } from "antd";

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
	},
];

function ManageHospitalsPage() {
	const { user } = useAuth();
	return (
		<AdminLayout>
			<AdminTable
				columns={columns}
				getApi={(axiosAuth, query) => orderApi.getOrders(query)}
			/>
		</AdminLayout>
	);
}

export default ManageHospitalsPage;

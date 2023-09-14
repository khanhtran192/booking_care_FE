import { manageDoctorApi, manageHospitalApi } from "@/axiosClient/endpoints";
import { OrderInfo } from "@/axiosClient/types";
import AdminTable, { AdminTableProps } from "@/components/AdminTable";
import AppConfirm from "@/components/AppConfirm";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, type TableColumnsType } from "antd";
import { Axios } from "axios";
import { useCallback } from "react";
import { renderOrderTag, statusProps } from "../orders";
import { useRouter } from "next/router";
import { ORDER_STATUS } from "@/global/constants";

const columns: TableColumnsType<OrderInfo> = [
	{
		title: "Ngày",
		dataIndex: "date",
		render: (date, { timeSlot }) => `${date} ${timeSlot.time}`,
	},
	{
		title: "Khách hàng",
		dataIndex: "customer",
		render: (customer) => customer.fullName,
	},
	{
		title: "Bên phụ trách",
		dataIndex: "doctor",
		render: (doctor, { pack }) => {
			return doctor?.name || pack?.name;
		},
	},
	{
		title: "Địa chỉ",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Triệu chứng",
		dataIndex: "symptom",
	},
	{
		title: "Giá tiền",
		dataIndex: "price",
	},
	{
		title: "Trạng thái",
		dataIndex: "status",
		filterMultiple: false,
		defaultFilteredValue: [ORDER_STATUS.PENDING],
		filters: Object.keys(ORDER_STATUS).map((key) => ({
			text: statusProps[key].children,
			value: key,
		})),
		render: renderOrderTag,
	},
];

function ManageRequestOrdersPage() {
	const { user } = useAuth();
	const router = useRouter();
	const getMoreActions = useCallback(
		(axiosAuth: Axios, record: OrderInfo) => {
			if (record.status !== ORDER_STATUS.PENDING) {
				return;
			}
			const url = `/doctors/orders/${record.id}/`;
			return (
				<>
					<AppConfirm
						title="Nhận đơn"
						onConfirm={async () => {
							await axiosAuth.put(url + "approved");
							router.replace(router.asPath);
						}}>
						<Button type="link" icon={<CheckOutlined />} />
					</AppConfirm>
					<AppConfirm
						title="Từ chối đơn"
						onConfirm={async () => {
							await axiosAuth.put(url + "rejected");
							router.replace(router.asPath);
						}}>
						<Button type="link" icon={<CloseCircleOutlined />} danger />
					</AppConfirm>
				</>
			);
		},
		[router]
	);

	const getApi = useCallback<NonNullable<AdminTableProps<OrderInfo>["getApi"]>>(
		(axiosAuth, query) => {
			const params: any = {
				...query,
				status: query.status ?? ORDER_STATUS.PENDING,
			};
			// if (!query.size) return Promise.resolve({} as any);
			if (user?.hospitalId) {
				return manageHospitalApi.getOrders(axiosAuth, user?.hospitalId, params);
			}
			if (user?.doctorId) {
				return manageDoctorApi.getOrders(axiosAuth, user?.doctorId, params);
			}
			return Promise.resolve({} as any);
		},
		[user?.doctorId, user?.hospitalId]
	);

	return (
		<AdminLayout>
			<AdminTable
				onCreate={false}
				getApi={getApi}
				getMoreActions={getMoreActions}
				columns={columns}
			/>
		</AdminLayout>
	);
}

export default ManageRequestOrdersPage;

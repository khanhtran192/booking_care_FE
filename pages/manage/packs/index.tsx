import { manageHospitalApi } from "@/axiosClient/endpoints";
import { Hospital } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import { renderImage } from "@/lib/renderUtils";
import type { TableColumnsType } from "antd";

const columns: TableColumnsType<Hospital> = [
	{
		width: 50,
		dataIndex: "logo",
		render: renderImage,
	},
	{
		title: "Tên",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Địa chỉ",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Số điện thoại",
		dataIndex: "phoneNumber",
		key: "phone",
	},
];

function ManageHospitalsPage() {
	const { user } = useAuth();
	return (
		<AdminLayout>
			<AdminTable
				columns={columns}
				getApi={(axiosAuth, query) =>
					manageHospitalApi.getPacks(axiosAuth, user?.hospitalId, query)
				}
			/>
		</AdminLayout>
	);
}

export default ManageHospitalsPage;

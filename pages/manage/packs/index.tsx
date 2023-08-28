import { manageHospitalApi, managePackApi } from "@/axiosClient/endpoints";
import { Pack } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import { renderImage } from "@/lib/renderUtils";
import type { TableColumnsType } from "antd";

const columns: TableColumnsType<Pack> = [
	{
		width: 50,
		dataIndex: "logo",
		render: renderImage,
	},
	{
		title: "Tên gói",
		dataIndex: "name",
	},
	{
		title: "Giá tiền",
		dataIndex: "price",
	},
];

function ManagePacksPage() {
	const { user } = useAuth();
	return (
		<AdminLayout>
			<AdminTable
				columns={columns}
				getApi={(axiosAuth, query) =>
					manageHospitalApi.getPacks(axiosAuth, user?.hospitalId as any, query)
				}
				toggleApi={(axiosAuth, record) =>
					managePackApi.toggleStatus(axiosAuth, record.id, record.active)
				}
			/>
		</AdminLayout>
	);
}

export default ManagePacksPage;

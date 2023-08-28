import {
	manageDepartmentApi,
	manageHospitalApi,
} from "@/axiosClient/endpoints";
import { Department } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import { renderImage } from "@/lib/renderUtils";
import type { TableColumnsType } from "antd";

const columns: TableColumnsType<Department> = [
	{
		width: 50,
		dataIndex: "logo",
		render: renderImage,
	},
	{
		title: "Tên",
		dataIndex: "departmentName",
		key: "name",
	},
];

function ManageHospitalsPage() {
	const { user } = useAuth();
	return (
		<AdminLayout>
			<AdminTable
				columns={columns}
				getApi={(axiosAuth, query) =>
					manageHospitalApi.getDepartments(
						axiosAuth,
						user?.hospitalId as any,
						query
					)
				}
				toggleApi={(axiosAuth, record) =>
					manageDepartmentApi.toggleStatus(
						axiosAuth,
						record.id,
						record.active as boolean
					)
				}
			/>
		</AdminLayout>
	);
}

export default ManageHospitalsPage;

import { manageDoctorApi, manageHospitalApi } from "@/axiosClient/endpoints";
import { Doctor } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import { renderImage } from "@/lib/renderUtils";
import { Rate, type TableColumnsType } from "antd";

const columns: TableColumnsType<Doctor> = [
	{
		width: 50,
		dataIndex: "avatar",
		render: renderImage,
	},
	{
		title: "Tên",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Đánh giá",
		dataIndex: "star",
		render: (star) => <Rate value={star} disabled />,
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
	{
		title: "Chuyên khoa",
		dataIndex: "department",
		render: (department) => department?.departmentName,
	},
];

function ManageDoctorsPage() {
	const { user } = useAuth();
	return (
		<AdminLayout>
			<AdminTable
				columns={columns}
				getApi={(axiosAuth, query) =>
					manageHospitalApi.getDoctors(
						axiosAuth,
						user?.hospitalId as any,
						query
					)
				}
				toggleApi={(axiosAuth, record) =>
					manageDoctorApi.toggleStatus(axiosAuth, record.id, record.active)
				}
			/>
		</AdminLayout>
	);
}

export default ManageDoctorsPage;

import { hospitalApi, manageHospitalApi } from "@/axiosClient/endpoints";
import { Hospital } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import { renderImage } from "@/lib/renderUtils";
import { Rate, type TableColumnsType } from "antd";
import { GetServerSideProps } from "next";

const columns: TableColumnsType<Hospital> = [
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
		dataIndex: "rate",
		render: (rate) => <Rate value={rate} disabled />,
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

function ManageHospitalsPage() {
	const { user } = useAuth();
	return (
		<AdminLayout>
			<AdminTable
				columns={columns}
				getApi={(axiosAuth, query) =>
					manageHospitalApi.getDoctors(axiosAuth, user?.hospitalId, query)
				}
			/>
		</AdminLayout>
	);
}

export default ManageHospitalsPage;

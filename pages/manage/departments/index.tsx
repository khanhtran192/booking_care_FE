import { hospitalApi, manageHospitalApi } from "@/axiosClient/endpoints";
import { Department, Hospital } from "@/axiosClient/types";
import { getUser } from "@/axiosClient/userStore";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { renderImage } from "@/lib/renderUtils";
import type { TableColumnsType } from "antd";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";

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

type Props = {
	hospitals: Awaited<ReturnType<typeof manageHospitalApi.getDepartments>>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
	res,
	req,
}) => {
	console.log("getCookie :", getCookie("hospitalId", { res, req }));
	console.log("getCookie :", getUser({ res, req }).id_token);

	const hospitals = await manageHospitalApi.getDepartments(
		getCookie("hospitalId", { res, req }) as string,
		query
	);
	return {
		props: {
			hospitals,
		},
	};
};

function ManageHospitalsPage({ hospitals }: Props) {
	const { data, ...rest } = hospitals;
	return (
		<AdminLayout>
			<AdminTable columns={columns} dataSource={data} pagination={rest} />
		</AdminLayout>
	);
}

export default ManageHospitalsPage;

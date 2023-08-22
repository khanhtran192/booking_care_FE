import { hospitalApi } from "@/axiosClient/endpoints";
import { Hospital } from "@/axiosClient/types";
import AdminTable from "@/components/AdminTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { renderImage } from "@/lib/renderUtils";
import type { TableColumnsType } from "antd";
import { GetServerSideProps } from "next";

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

type Props = {
	hospitals: Awaited<ReturnType<typeof hospitalApi.get>>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
}) => {
	const hospitals = await hospitalApi.get(query);
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

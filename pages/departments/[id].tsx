import { departmentApi } from "@/axiosClient/endpoints";
import { Department } from "@/axiosClient/types";
import CardList from "@/components/CardList";
import AppContainer from "@/components/layout/AppContainer";
import DetailLayout from "@/components/layout/DetailLayout";
import { Typography } from "antd";
import { GetServerSideProps } from "next";

type Props = {
	doctorList: Awaited<ReturnType<typeof departmentApi.getDoctors>>;
	department: Department;
};

export const getServerSideProps: GetServerSideProps = async ({
	query,
	params,
}) => {
	const id = params?.id as string;
	const department = await departmentApi.getById(id);
	const doctorList = await departmentApi.getDoctors(id, query);

	return {
		props: {
			doctorList,
			department,
		},
	};
};

function Department({ doctorList, department }: Props) {
	return (
		<DetailLayout
			title={department.departmentName}
			subTitle={department.hospital.name}
			avatar={department.logo}
			bgImage={department.hospital.backgroundImage}>
			<AppContainer>
				<Typography.Title level={2} className="!text-xl">
					Giới thiệu
				</Typography.Title>
				<hr className="mb-4" />
				<div
					dangerouslySetInnerHTML={{
						__html: department.description ?? "",
					}}></div>
				<div className="py-16">
					<Typography.Title level={2} className="!text-xl">
						Bác sỹ
					</Typography.Title>
					<hr className="mb-4" />
					<CardList
						{...doctorList}
						data={doctorList.data.map((doctor) => {
							return {
								address: doctor.department.hospital.name,
								image: doctor.avatar,
								id: doctor.id,
								title: doctor.name,
								desc: doctor.degree,
							};
						})}
					/>
				</div>
			</AppContainer>
		</DetailLayout>
	);
}

export default Department;

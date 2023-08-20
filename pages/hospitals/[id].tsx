import { hospitalApi } from "@/axiosClient/endpoints";
import { Hospital } from "@/axiosClient/types";
import AppCard from "@/components/AppCard";
import AppPagination from "@/components/CardList/ListPagination";
import AppContainer from "@/components/layout/AppContainer";
import AppGrid from "@/components/layout/AppGrid";
import DetailLayout from "@/components/layout/DetailLayout";
import PackList from "@/components/sections/PackList";
import { Typography } from "antd";
import { GetServerSideProps } from "next";

type Props = {
	packList: Awaited<ReturnType<typeof hospitalApi.getPackages>>;
	departmentList: Awaited<ReturnType<typeof hospitalApi.getDepartments>>;
	hospital: Hospital;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
	params,
}) => {
	const queryParams = { ...query } as Record<string, any>;
	const hospital = await hospitalApi.getById(params?.id as string);
	const packList = await hospitalApi.getPackages(params?.id as string, {
		page: queryParams.packPage,
		size: queryParams.packSize,
	});
	const departmentList = await hospitalApi.getDepartments(
		params?.id as string,
		{
			page: queryParams.departmentPage,
			size: queryParams.departmentSize,
		}
	);
	return {
		props: {
			packList,
			departmentList,
			hospital,
		},
	};
};

function Hospital({ packList, departmentList, hospital }: Props) {
	const { data: departments, ...departmentPagination } = departmentList;
	return (
		<DetailLayout
			title={hospital.name}
			subTitle={hospital.address}
			avatar={hospital.logo}
			bgImage={hospital.backgroundImage}>
			<AppContainer>
				<Typography.Title level={2} className="!text-xl">
					Giới thiệu
				</Typography.Title>

				<div className="py-16">
					<Typography.Title level={2} className="!text-xl">
						Chuyên khoa
					</Typography.Title>
					<hr className="mb-4" />
					<AppGrid>
						{departments.map((department) => (
							<AppCard
								key={department.id}
								image={department.logo}
								title={department.departmentName}
								href={`/departments/${department.id}`}
							/>
						))}
					</AppGrid>
					<AppPagination
						{...departmentPagination}
						pageSizeName="departmentSize"
						pageName="departmentPage"
					/>
				</div>
				<div className="py-16">
					<Typography.Title level={2} className="!text-xl">
						Gói khám
					</Typography.Title>
					<hr className="mb-4" />
					<PackList {...packList} pageSizeName="packSize" pageName="packPage" />
				</div>
			</AppContainer>
		</DetailLayout>
	);
}

export default Hospital;

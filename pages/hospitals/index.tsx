import { hospitalApi } from "@/axiosClient/endpoints";
import AppCard from "@/components/AppCard";
import AppPagination from "@/components/CardList/ListPagination";
import Layout from "@/components/layout";
import AppContainer from "@/components/layout/AppContainer";
import AppGrid from "@/components/layout/AppGrid";
import ListLayout from "@/components/layout/ListLayout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

type Props = {
	hospitals: Awaited<ReturnType<typeof hospitalApi.get>>;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
}) => {
	const hospitals = await hospitalApi.get(query);
	console.log("hospitals :", hospitals);
	return {
		props: {
			hospitals,
		},
	};
};

function Hospital({ hospitals }: Props) {
	const router = useRouter();
	const { data, ...rest } = hospitals;
	return (
		<Layout
			onSearch={(value) => {
				router.replace(`/hospitals?keyword=${value}`);
			}}>
			<ListLayout title="Cơ sở y tế">
				<AppContainer className="py-16">
					<AppGrid>
						{data?.map((hospital, i) => (
							<div key={hospital.id}>
								<AppCard
									className="h-full"
									image={
										hospital.backgroundImage ||
										"https://img.freepik.com/premium-vector/hospital-building-exterior-modern-clinic-view_43633-7220.jpg"
									}
									title={hospital.name}
									href={`/hospitals/${hospital.id}`}
								/>
							</div>
						))}
					</AppGrid>
					<AppPagination {...rest} />
				</AppContainer>
			</ListLayout>
		</Layout>
	);
}

export default Hospital;

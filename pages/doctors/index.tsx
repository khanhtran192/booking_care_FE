import { doctorApi } from "@/axiosClient/endpoints";
import CardList, { CardListProps } from "@/components/CardList";
import Layout from "@/components/layout";
import AppContainer from "@/components/layout/AppContainer";
import { GetServerSideProps } from "next";

type Props = {
	doctorList: CardListProps;
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const doctors = await doctorApi.get();

	return {
		props: {
			doctorList: {
				total: doctors.totalElements,
				pageSize: doctors.size,
				data: doctors.content.map((data) => ({
					title: data.name,
					image: data.avatar,
					desc: data.degree,
					address: data.department.hospital.address,
					id: data.id,
				})),
			} as CardListProps,
		},
	};
};
function DoctorPage({ doctorList }: Props) {
	return (
		<Layout
			pageTitle="Bác sỹ nổi bật"
			subTitle="Danh sách Giáo sư, Bác sỹ kinh nghiệm trong nhiều lĩnh vực">
			<AppContainer className="py-16">
				<CardList {...doctorList} />
			</AppContainer>
		</Layout>
	);
}

export default DoctorPage;

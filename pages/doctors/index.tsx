import { doctorApi } from "@/axiosClient/endpoints";
import CardList from "@/components/CardList";
import Layout from "@/components/layout";
import AppContainer from "@/components/layout/AppContainer";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

type Props = {
	doctorList: Awaited<ReturnType<typeof doctorApi.get>>;
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const doctorList = await doctorApi.get(query);

	return {
		props: {
			doctorList,
		},
	};
};
function DoctorPage({ doctorList }: Props) {
	const router = useRouter();
	return (
		<Layout
			pageTitle="Bác sỹ nổi bật"
			subTitle="Danh sách Giáo sư, Bác sỹ kinh nghiệm trong nhiều lĩnh vực"
			onSearch={(keyword) => router.replace(`/doctors?keyword=${keyword}`)}>
			<AppContainer className="py-16">
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
			</AppContainer>
		</Layout>
	);
}

export default DoctorPage;

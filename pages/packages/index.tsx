import { packApi } from "@/axiosClient/endpoints";
import Layout from "@/components/layout";
import AppContainer from "@/components/layout/AppContainer";
import PackList from "@/components/sections/PackList";
import { GetServerSideProps } from "next";

type Props = { packList: Awaited<ReturnType<typeof packApi.get>> };

export const getServerSideProps: GetServerSideProps = async (query) => {
	const packList = await packApi.get(query as any);
	return {
		props: {
			packList,
		},
	};
};

function PackagePage({ packList }: Props) {
	return (
		<Layout
			pageTitle="Danh sách gói khám"
			subTitle="Danh sách Giáo sư, Bác sỹ kinh nghiệm trong nhiều lĩnh vực">
			<AppContainer className="py-16">
				<PackList {...packList} />
			</AppContainer>
		</Layout>
	);
}

export default PackagePage;

import { packApi } from "@/axiosClient/endpoints";
import { HOSPITALS, PACKS } from "@/axiosClient/urls";
import BookForm from "@/components/form/BookForm";
import AppContainer from "@/components/layout/AppContainer";
import Footer from "@/components/layout/Footer";
import MainHeader from "@/components/layout/MainHeader";
import { useFetch } from "@/lib/hooks";
import { Avatar, Typography } from "antd";
import { GetServerSideProps } from "next";

type Props = {
	pack: Awaited<ReturnType<typeof packApi.getById>>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const pack = await packApi.getById(params?.id as string);
	return {
		props: {
			pack,
		},
	};
};

function DoctorDetailPage({ pack }: Props) {
	const { data } = useFetch(`${HOSPITALS}${PACKS}/${pack.id}/time-slots`);

	return (
		<>
			<MainHeader />
			<div className="bg-gradient-to-br from-blue-50 via-purple-50 via-purple-100 to-white to-90%">
				<AppContainer className="mt-[4.5rem] py-8 flex gap-8 items-center">
					<Avatar
						className="border-2 border-solid border-blue-200 aspect-square shrink-0"
						size={240}
						src={
							pack.logo ||
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1bCW97HV3Pdoboi7QnR8_8_KTCl28yyE6Q&usqp=CAU"
						}
					/>
					<div>
						<Typography.Title level={1}>{pack.name}</Typography.Title>
					</div>
				</AppContainer>
			</div>
			<AppContainer className="mb-4">
				<div className="grid grid-cols-2 pt-4">
					<div>
						<Typography.Title level={3}>Địa chỉ khám</Typography.Title>
						<p>{pack.hospital.name}</p>
						<p>{pack.hospital.address}</p>
					</div>
					<BookForm data={data} />
				</div>
				<hr className="my-4" />
				<div
					className="innerHtml-desc"
					dangerouslySetInnerHTML={{
						__html: pack.description,
					}}></div>
			</AppContainer>
			<Footer />
		</>
	);
}

export default DoctorDetailPage;

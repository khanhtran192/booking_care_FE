import { doctorApi } from "@/axiosClient/endpoints";
import { DOCTORS } from "@/axiosClient/urls";
import BookForm from "@/components/form/BookForm";
import AppContainer from "@/components/layout/AppContainer";
import Footer from "@/components/layout/Footer";
import MainHeader from "@/components/layout/MainHeader";
import { useAuth } from "@/lib/AuthProvider";
import { Avatar, Typography } from "antd";
import { GetServerSideProps } from "next";

type Props = {
	doctor: Awaited<ReturnType<typeof doctorApi.getById>>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const doctor = await doctorApi.getById(params?.id as string);
	return {
		props: {
			doctor,
		},
	};
};

function DoctorDetailPage({ doctor }: Props) {
	const { axiosAuth } = useAuth();

	return (
		<>
			<MainHeader />
			<div className="bg-gradient-to-br from-blue-50 via-purple-50 via-purple-100 to-white to-90%">
				<AppContainer className="mt-[4.5rem] py-8 flex gap-8 items-center">
					<Avatar
						className="border-2 border-solid border-blue-200 aspect-square shrink-0"
						size={240}
						src={
							doctor.avatar ||
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1bCW97HV3Pdoboi7QnR8_8_KTCl28yyE6Q&usqp=CAU"
						}
					/>
					<div>
						<Typography.Title level={1}>{doctor.name}</Typography.Title>
						<p>
							{doctor.degree ??
								`Nguyên Trưởng khoa Tai mũi họng trẻ em, Bệnh viện Tai Mũi Họng
							Trung ương Trên 25 năm công tác tại Bệnh viện Tai mũi họng Trung
							ương Chuyên khám và điều trị các bệnh lý Tai Mũi Họng người lớn và
							trẻ em`}
						</p>
					</div>
				</AppContainer>
			</div>
			<AppContainer className="mb-4">
				<div className="grid grid-cols-2 pt-4">
					<div>
						<Typography.Title level={3}>Địa chỉ khám</Typography.Title>
						<p>{`Khoa: ${doctor.department.departmentName}`}</p>
						<p>{doctor.department.hospital.name}</p>
						<p>{doctor.department.hospital.address}</p>
					</div>
					<BookForm
						doctorId={doctor?.id}
						urlTimeSlotFree={`${DOCTORS}/${doctor?.id}/time-slot-free`}
					/>
				</div>
				<hr className="my-4" />
				<div
					className="innerHtml-desc"
					dangerouslySetInnerHTML={{
						__html: doctor.specialize,
					}}></div>
			</AppContainer>
			<Footer />
		</>
	);
}

export default DoctorDetailPage;

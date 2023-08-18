import axiosClient from "@/axiosClient";
import { doctorApi, hospitalApi } from "@/axiosClient/endpoints";
import { DOCTORS, HOSPITALS } from "@/axiosClient/urls";
import Card, { CardProps } from "@/components/AppCard";
import AppCarousel from "@/components/AppCarousel";
import Layout from "@/components/layout";
import AppContainer from "@/components/layout/AppContainer";
import Doctor from "@/components/sections/Doctor";
import SectionList from "@/components/sections/SectionList";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const hospitals = await hospitalApi.get();
	const doctors = await doctorApi.get();

	return {
		props: {
			hospitals: hospitals.map(
				({ backgroundImage, name, ...hospital }: any) => ({
					...hospital,
					title: name,
					image:
						backgroundImage ||
						"https://img.freepik.com/premium-vector/hospital-building-exterior-modern-clinic-view_43633-7220.jpg",
					href: "doctors/" + hospital.id,
				})
			),
			doctors: doctors.content
				.slice(0, 8)
				.map(({ department, ...doctor }: any) => ({
					...doctor,
					department: department.departmentName,
				})),
			blogs: Array(6).fill({
				title: "Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám",
				image: "https://cdn.bookingcare.vn/fo/2022/08/16/141010-cds.png",
				href: "/",
				content: `Mô hình "Nền tảng như một dịch vụ" bao gồm Website, ứng dụng di động và phần mềm quản trị, tích hợp 3 trong 1 nền tảng tiện ích dễ dùng`,
			}),
		},
	};
};

export default function Home({ hospitals, doctors, blogs }: any) {
	return (
		<Layout pageTitle={"Nền tảng y tế Chăm sóc sức khỏe toàn diện"}>
			<div className="py-16">
				<AppContainer>
					<AppCarousel>
						{blogs.map((blog: any, i: number) => (
							<Card key={i} {...blog} />
						))}
					</AppCarousel>
				</AppContainer>
			</div>
			<SectionList
				className="bg-gray-100"
				title="Cơ sở y tế nổi bật"
				href="/hospitals">
				{hospitals.map((hospital: any) => (
					<Card key={hospital.id} {...hospital} />
				))}
			</SectionList>
			<div>
				<AppContainer>
					<Doctor doctors={doctors} />
				</AppContainer>
			</div>
		</Layout>
	);
}

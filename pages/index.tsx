import Image from "next/image";
import { Inter } from "next/font/google";
import Doctor from "@/components/sections/Doctor";
import Footer from "@/components/layout/Footer";
import Card, { CardProps } from "@/components/AppCard";
import Link from "next/link";
import AppCarousel from "@/components/AppCarousel";
import AppContainer from "@/components/layout/AppContainer";
import SectionList from "@/components/sections/SectionList";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

const blogs: CardProps[] = Array(6).fill({
	title: "Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám",
	image: "https://cdn.bookingcare.vn/fo/2022/08/16/141010-cds.png",
	href: "/",
	content: `Mô hình "Nền tảng như một dịch vụ" bao gồm Website, ứng dụng di động và phần mềm quản trị, tích hợp 3 trong 1 nền tảng tiện ích dễ dùng`,
});

const departments: CardProps[] = Array(5).fill({
	small: true,
	title: "Thần kinh",
	image: "https://cdn.bookingcare.vn/fr/w300/2023/06/20/113208-than-kinh.jpg",
});

const hospitals: CardProps[] = Array(4).fill({
	small: true,
	title: "Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108",
	image:
		"https://cdn.bookingcare.vn/fr/w500/2019/07/31/085056logobenhvien108.jpg",
});

export default function Home() {
	return (
		<Layout pageTitle={"Nền tảng y tế Chăm sóc sức khỏe toàn diện"}>
			<div className="py-16">
				<AppContainer>
					<AppCarousel>
						{blogs.map((blog, i) => (
							<Card key={i} {...blog} />
						))}
					</AppCarousel>
				</AppContainer>
			</div>
			<SectionList
				className="bg-gray-100"
				title="Chuyên khoa phổ biến"
				href="/departments">
				{departments.map((department, i) => (
					<Card key={i} {...department} />
				))}
			</SectionList>
			<SectionList title="Cơ sở y tế nổi bật" href="/hospitals">
				{hospitals.map((department, i) => (
					<Card key={i} {...department} />
				))}
			</SectionList>
			<div>
				<AppContainer>
					<Doctor />
				</AppContainer>
			</div>
		</Layout>
	);
}

import Image from "next/image";
import { Inter } from "next/font/google";
import Doctor from "@/components/sections/Doctor";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<div className="bg-gradient-to-br from-blue-50 via-purple-50 via-purple-100 to-white to-90%">
				<div className="mx-auto lg:max-w-6xl container flex">
					<div className="flex flex-col gap-10 py-10 items-start">
						<button className="rounded-full bg-white px-4 py-3 text-xs">
							<span className="rounded-full px-2 py-1 bg-purple-500 text-white mr-1">
								CAREBLOG
							</span>
							Tin tức được featured
						</button>
						<h1 className="text-purple-500 text-7xl">
							Nền tảng y tế <br />
							Chăm sóc sức khỏe <br />
							toàn diện
						</h1>
						<input
							type="text"
							className="py-2 px-3 rounded w-3/4 border border-gray-100 border-solid"
							placeholder="Tìm bệnh viện"
						/>
					</div>
					<Image
						className="flex-1"
						src="mainBg.svg"
						alt=""
						width={300}
						height={300}
					/>
				</div>
			</div>
			<div>
				<div className="container lg:max-w-6xl mx-auto flex gap-4 py-16">
					<Card
						title="Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám"
						image="https://cdn.bookingcare.vn/fo/2022/08/16/141010-cds.png"
					/>
					<Card
						title="Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám"
						image="https://cdn.bookingcare.vn/fo/2022/08/16/141010-cds.png"
					/>
					<Card
						title="Giải pháp chuyển đổi số toàn diện cho bệnh viện, phòng khám"
						image="https://cdn.bookingcare.vn/fo/2022/08/16/141010-cds.png"
					/>
				</div>
			</div>
			<div className="bg-gray-100 py-16">
				<div className="container lg:max-w-6xl mx-auto">
					<div className="flex justify-between">
						<h3 className="text-lg font-bold">Chuyên khoa phổ biến</h3>
						<Link href="/" className="text-orange-300">
							Xem thêm
						</Link>
					</div>
					<div className="flex gap-4">
						<Card
							small
							title="Thần kinh"
							image="https://cdn.bookingcare.vn/fr/w300/2023/06/20/113208-than-kinh.jpg"
						/>
						<Card
							small
							title="Thần kinh"
							image="https://cdn.bookingcare.vn/fr/w300/2023/06/20/113208-than-kinh.jpg"
						/>
						<Card
							small
							title="Thần kinh"
							image="https://cdn.bookingcare.vn/fr/w300/2023/06/20/113208-than-kinh.jpg"
						/>
					</div>
				</div>
			</div>
			<div>
				<div className="container lg:max-w-6xl mx-auto">
					<Doctor />
				</div>
			</div>
			<Footer />
		</>
	);
}

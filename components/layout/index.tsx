import Image from "next/image";
import { ReactNode } from "react";
import MainHeader from "./MainHeader";
import { Input } from "antd";
import Footer from "./Footer";

type Props = {
	children: ReactNode;
	pageTitle?: ReactNode;
	bgImage?: string;
	subTitle?: string;
};

function Layout({
	children,
	pageTitle,
	bgImage = "mainBg.svg",
	subTitle,
}: Props) {
	return (
		<>
			<MainHeader />
			<div className="mt-[4.5rem]">
				<div className="bg-gradient-to-br from-blue-50 via-purple-50 via-purple-100 to-white to-90%">
					<div className="mx-auto lg:max-w-6xl container flex">
						<div className="flex flex-col gap-10 py-10 items-start flex-1 justify-center">
							<button className="rounded-full bg-white px-4 py-3 text-xs">
								<span className="rounded-full px-2 py-1 bg-purple-500 text-white mr-1">
									CAREBLOG
								</span>
								Tin tức được featured
							</button>
							<h1 className="text-purple-500 text-7xl">{pageTitle}</h1>
							<p className="text-xl text-blue-400">{subTitle}</p>
							<Input
								className="w-3/4"
								type="text"
								placeholder="Tìm bệnh viện"
							/>
						</div>
						<Image
							className="w-1/2"
							src={bgImage}
							alt=""
							width={300}
							height={300}
						/>
					</div>
				</div>
				{children}
			</div>
			<Footer />
		</>
	);
}

export default Layout;

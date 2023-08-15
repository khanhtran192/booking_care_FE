import React, { ReactNode } from "react";
import MainHeader from "./MainHeader";
import Image from "next/image";
import { Typography } from "antd";
import AppContainer from "./AppContainer";

type Props = {
	bgImage?: string;
	avatar?: string;
	title?: string;
	subTitle?: string;
	children?: ReactNode;
};

function DetailLayout({ bgImage, avatar, title, subTitle, children }: Props) {
	return (
		<>
			<MainHeader />
			<div className="mt-[4.5rem]">
				<div
					className="relative aspect-[3/1] bg-no-repeat bg-cover bg-center mb-16"
					style={{
						backgroundImage: `url("${bgImage}")`,
					}}>
					<AppContainer className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 flex bg-white bg-opacity-70 shadow-md gap-8 rounded items-center p-4">
						<Image src={avatar ?? ""} width={112} height={112} alt="logo" />
						<div>
							<Typography.Title level={1} className="!text-2xl">
								{title}
							</Typography.Title>
							<Typography.Text className="mb-0 text-lg">
								{subTitle}
							</Typography.Text>
						</div>
					</AppContainer>
				</div>
				{children}
			</div>
		</>
	);
}

export default DetailLayout;

import Image from "next/image";
import React from "react";

type Props = {
	children: React.ReactNode;
};

function LoginLayout({ children }: Props) {
	return (
		<div className="flex items-center w-full h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-purple-100 to-white to-90%">
			<Image
				className="w-1/2"
				src="mainBg.svg"
				alt=""
				width={300}
				height={300}
			/>
			<div className="flex-1 flex justify-center items-center">
				<div className="rounded-3xl shadow-md bg-white p-8 pb-4">
					{children}
				</div>
			</div>
		</div>
	);
}

export default LoginLayout;

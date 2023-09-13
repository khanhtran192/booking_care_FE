import Image from "next/image";
import React, { ReactNode } from "react";
import { Form, FormProps } from "antd";
import { cn } from "@/lib/utils";

function LoginLayout<Values>({
	children,
	form,
	onFinish,
	className,
	...props
}: FormProps<Values>) {
	return (
		<div className="flex items-center justify-evenly w-full h-screen bg-gradient-to-br from-blue-50 via-purple-50 via-purple-100 to-white to-90%">
			<Image
				className="w-1/2"
				src="/mainBg.svg"
				alt="background"
				width={300}
				height={300}
			/>
			<div className="rounded-3xl shadow-md bg-white p-8 pb-4">
				<Form
					form={form}
					className={cn(
						"flex flex-col w-full min-h-[30rem] min-w-[20rem]",
						className
					)}
					validateMessages={{ required: "Thông tin này là bắt buộc" }}
					onFinish={onFinish}
					{...props}>
					{children as ReactNode}
				</Form>
			</div>
		</div>
	);
}

export default LoginLayout;

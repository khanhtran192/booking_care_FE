import { authApi } from "@/axiosClient/endpoints";
import LoginLayout from "@/components/layout/LoginLayout";
import { usePost } from "@/lib/hooks";
import { Button, Form, Input, Typography, message } from "antd";
import Link from "next/link";
import React, { useCallback } from "react";

type Props = {};

function ForgotPassword({}: Props) {
	const [form] = Form.useForm();
	const resetHandle = useCallback(({ email }: any) => {
		console.log("email :", email);
		if (!email) {
			return Promise.reject("Vui lòng nhập email");
		}
		return authApi.resetPassword(email).then(() => {
			message.success(
				"Đã gửi yêu cầu đặt lại mật khẩu! Vui lòng kiểm tra email của bạn"
			);
		});
	}, []);
	const { loading, postFunction } = usePost(resetHandle);

	return (
		<LoginLayout
			form={form}
			onFinish={postFunction}
			layout="vertical"
			className="min-h-[20rem]">
			<div className="flex justify-between items-center">
				<Typography.Title level={2} className="!mb-0">
					Trợ giúp
				</Typography.Title>
				<Link href="/login" className="w-fit">
					<Button className="float-right" type="link">
						Quay lại
					</Button>
				</Link>
			</div>
			<Form.Item
				className="mt-16"
				label="Nhập email của bạn"
				name="email"
				help="Hệ thống sẽ gửi email xác nhận cho bạn">
				<Input />
			</Form.Item>
			<Button
				loading={loading}
				type="primary"
				htmlType="submit"
				className="w-full mt-auto">
				Gửi yêu cầu
			</Button>
		</LoginLayout>
	);
}

export default ForgotPassword;

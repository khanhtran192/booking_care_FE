import { authApi } from "@/axiosClient/endpoints";
import LoginLayout from "@/components/layout/LoginLayout";
import { usePost } from "@/lib/hooks";
import { Button, Form, Input, Typography, message } from "antd";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

type Props = {
	resetKey: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	query,
}) => {
	const resetKey = query.key as string;
	return {
		props: {
			resetKey,
		},
	};
};

function ResetPassword({ resetKey }: Props) {
	const router = useRouter();
	const resetHandle = useCallback(
		(values: any) =>
			authApi.changePassword(resetKey, values.newPassword).then(() => {
				message.success("Đổi mật khẩu thành công!");
				router.push("/login");
			}),
		[resetKey, router]
	);
	const { loading, postFunction } = usePost(resetHandle);

	return (
		<LoginLayout onFinish={postFunction}>
			<Typography.Title level={2}>Đổi mật khẩu</Typography.Title>
			<Form.Item className="mt-16" name="newPassword">
				<Input.Password placeholder="Mật khẩu mới" />
			</Form.Item>
			<Form.Item name="confirmPassword">
				<Input.Password placeholder="Xác nhận mật khẩu" />
			</Form.Item>
			<Button
				loading={loading}
				type="primary"
				htmlType="submit"
				className="w-full">
				Đăng nhập
			</Button>
		</LoginLayout>
	);
}

export default ResetPassword;

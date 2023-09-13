import React, { useCallback } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import LoginLayout from "@/components/layout/LoginLayout";
import { usePost } from "@/lib/hooks";
import { authApi } from "@/axiosClient/endpoints";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/AuthProvider";

const LoginForm: React.FC = () => {
	const { setUser } = useAuth();
	const [form] = Form.useForm();
	const router = useRouter();
	const loginHandle = useCallback(
		(values: any) =>
			authApi.login(values).then((user) => {
				setUser(user);
				router.replace("/");
			}),
		[router, setUser]
	);
	const { loading, postFunction } = usePost(loginHandle);

	return (
		<LoginLayout form={form} onFinish={postFunction} disabled={loading}>
			<Typography.Title level={2}>Đăng nhập</Typography.Title>
			<Form.Item className="mt-16" name="username" rules={[{ required: true }]}>
				<Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true }]}>
				<Input
					prefix={<LockOutlined />}
					type="password"
					placeholder="Mật khẩu"
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item name="rememberMe" valuePropName="checked" noStyle>
					<Checkbox>Lưu thông tin đăng nhập</Checkbox>
				</Form.Item>
			</Form.Item>
			<Button
				loading={loading}
				type="primary"
				htmlType="submit"
				className="w-full">
				Đăng nhập
			</Button>
			<Link href="/forgot" className="w-fit mx-auto">
				<Button className="float-right" type="link">
					Quên mật khẩu?
				</Button>
			</Link>

			<div className="mt-auto flex items-center justify-center">
				<Link href="/register">
					<Button type="link">Đăng ký ngay!</Button>
				</Link>
			</div>
		</LoginLayout>
	);
};

export default LoginForm;

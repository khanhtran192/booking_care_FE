import React from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, } from "antd";
import LoginLayout from "@/components/layout/LoginLayout";
import Link from "next/link";
import { authApi } from "@/axiosClient/endpoints";
import { usePost } from "@/lib/hooks";

const LoginForm: React.FC = () => {
	const [form] = Form.useForm();
	const { loading, postFunction } = usePost(authApi.register);

	return (
			<LoginLayout form={form} onFinish={(values) => postFunction(values)} disabled={loading}>
					<Typography.Title level={2}>Đăng ký</Typography.Title>
					<Form.Item
							className="mt-16"
							name="login"
							rules={[{ required: true }]}>
						<Input prefix={<UserOutlined/>} placeholder="Tên đăng nhập"/>
					</Form.Item>
					<Form.Item
							name="email"
							rules={[{ required: true }]}>
						<Input prefix={<MailOutlined/>} placeholder="Email"/>
					</Form.Item>
					<Form.Item name="password" rules={[{ required: true }]}>
						<Input
								prefix={<LockOutlined/>}
								type="password"
								placeholder="Mật khẩu"
						/>
					</Form.Item>
					<Form.Item name="confirmPassword" rules={[{ required: true }]}>
						<Input
								prefix={<LockOutlined/>}
								type="password"
								placeholder="Nhập lại mật khẩu"
						/>
					</Form.Item>
					<Button loading={loading} type="primary" htmlType="submit" className="w-full mt-4">
						Đăng ký
					</Button>

					<div className="mt-auto flex justify-center">
						<Link href="/login">
							<Button type="link">Đăng nhập ngay!</Button>
						</Link>
					</div>
			</LoginLayout>
	);
};

export default LoginForm;

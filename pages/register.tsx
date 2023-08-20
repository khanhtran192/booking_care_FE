import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Form,
	FormInstance,
	Input,
	Modal,
	ModalProps,
	Typography,
} from "antd";
import LoginLayout from "@/components/layout/LoginLayout";
import Link from "next/link";

const LoginForm: React.FC = () => {
	const [form] = Form.useForm();
	const onFinish = (values: any) => {
		console.log("Received values of form: ", values);
	};

	return (
		<LoginLayout>
			<Form
				form={form}
				name="normal_login"
				className="flex flex-col w-full min-h-[30rem] min-w-[20rem]"
				initialValues={{ remember: true }}
				validateMessages={{ required: "{{label}} không được để trống" }}
				onFinish={onFinish}>
				<Typography.Title level={2}>Đăng ký</Typography.Title>
				<Form.Item
					className="mt-16"
					name="username"
					rules={[{ required: true }]}>
					<Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true }]}>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder="Mật khẩu"
					/>
				</Form.Item>
				<Form.Item name="confirmPassword" rules={[{ required: true }]}>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder="Nhập lại mật khẩu"
					/>
				</Form.Item>
				<Button type="primary" htmlType="submit" className="w-full mt-4">
					Đăng ký
				</Button>

				<div className="mt-auto flex justify-center">
					<Link href="/login">
						<Button type="link">Đăng nhập ngay!</Button>
					</Link>
				</div>
			</Form>
		</LoginLayout>
	);
};

export default LoginForm;

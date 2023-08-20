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
import Link from "next/link";
import LoginLayout from "@/components/layout/LoginLayout";

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
				<Typography.Title level={2}>Đăng nhập</Typography.Title>
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
				<Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>Lưu thông tin đăng nhập</Checkbox>
					</Form.Item>
				</Form.Item>
				<Button type="primary" htmlType="submit" className="w-full">
					Đăng nhập
				</Button>
				<Button className="float-right" type="link">
					Quên mật khẩu?
				</Button>

				<div className="mt-auto flex items-center justify-center">
					<Link href="/register">
						<Button type="link">Đăng ký ngay!</Button>
					</Link>
				</div>
			</Form>
		</LoginLayout>
	);
};

export default LoginForm;

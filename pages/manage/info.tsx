import Logo from "@/components/Logo";
import AppDatePicker from "@/components/fields/AppDatePicker";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import { Button, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const config = {
	rules: [
		{ type: "object" as const, required: true, message: "Please select time!" },
	],
};

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 24,
			offset: 0,
		},
	},
};
interface CustomerData {
	id: number;
	fullName: string;
	address: string;
	dateOfBirth: string;
	phoneNumber: number;
	idCard: string;
	gender: string;
}

const Info: React.FC = () => {
	const { axiosAuth, user } = useAuth();
	const [form] = Form.useForm();

	const [data, setData] = useState<CustomerData>({
		id: 1,
		fullName: "",
		address: "",
		dateOfBirth: "",
		phoneNumber: 0,
		idCard: "",
		gender: "",
	});

	//fetch data
	useEffect(() => {
		axiosAuth
			.get(`/customers/${user?.userId}`)
			.then((response) => {
				setData(response as unknown as CustomerData);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	}, [axiosAuth, user?.userId]);

	// Set form fields value when data changes
	useEffect(() => {
		form.setFieldsValue({ ...data });
	}, [data, form]);

	const onFinish = (values: any) => {
		try {
			if (!user?.userId) {
				axiosAuth.post("/customers", values);
				message.success("Thêm thông tin thành công");
			} else {
				axiosAuth.put(`customers/${user?.userId}`, values);
				message.success("Cập nhật thông tin thành công");
			}
		} catch (error) {
			console.error("Error updating user data: ", error);
		}
	};

	return (
		<AdminLayout>
			<Form
				{...formItemLayout}
				form={form}
				labelAlign="left"
				name="register"
				onFinish={onFinish}
				style={{ minWidth: 600 }}
				scrollToFirstError
				className="width-full">
				<div className="flex justify-center mb-6">
					<Logo />
				</div>
				{/*<Form.Item name="id" label="Id" required>*/}
				{/*  <Input />*/}
				{/*</Form.Item>*/}

				{/*<Form.Item*/}
				{/*  name="firstName"*/}
				{/*  label="First Name"*/}
				{/*  rules={[*/}
				{/*    {*/}
				{/*      required: true,*/}
				{/*      message: "Please input your first name!",*/}
				{/*    },*/}
				{/*  ]}*/}
				{/*  hasFeedback*/}
				{/*>*/}
				{/*  <Input />*/}
				{/*</Form.Item>*/}

				{/*<Form.Item*/}
				{/*  name="lastName"*/}
				{/*  label="Last Name"*/}
				{/*  rules={[*/}
				{/*    {*/}
				{/*      required: true,*/}
				{/*      message: "Please input your last name!",*/}
				{/*    },*/}
				{/*  ]}*/}
				{/*  hasFeedback*/}
				{/*>*/}
				{/*  <Input />*/}
				{/*</Form.Item>*/}

				<Form.Item
					name="fullName"
					label="Họ và tên"
					rules={[
						{
							required: true,
							message: "Please input your full name!",
						},
					]}
					hasFeedback>
					<Input />
				</Form.Item>

				<Form.Item
					name="address"
					label="Địa chỉ"
					rules={[
						{
							required: true,
							message: "Please input your address!",
						},
					]}
					hasFeedback>
					<Input />
				</Form.Item>

				<Form.Item name="dateOfBirth" label="Ngày sinh" {...config}>
					<AppDatePicker />
				</Form.Item>
				{/*<Form.Item*/}
				{/*  name="email"*/}
				{/*  label="Email"*/}
				{/*  rules={[{ type: "email", required: true }]}*/}
				{/*>*/}
				{/*  <Input />*/}
				{/*</Form.Item>*/}
				<Form.Item
					name="phoneNumber"
					label="Số điện thoại"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập số điện thoại liên hệ",
						},
					]}>
					<Input
						type="number"
						placeholder="Enter numbers only"
						style={{ width: "100%" }}
					/>
				</Form.Item>
				<Form.Item
					name="idCard"
					label="Số căn cước công dân"
					rules={[
						{
							required: true,
							message:
								"Nhập số CCCD để xác minh bạn. Thông tin sẽ được bảo mật. ",
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					name="gender"
					label="Giới tính"
					rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}>
					<Select placeholder="Chọn giới tính">
						<Option value="NAM">Nam</Option>
						<Option value="NU">Nữ</Option>
						{/*<Option value="other">KHAC</Option>*/}
					</Select>
				</Form.Item>
				<Form.Item {...tailFormItemLayout} className="flex justify-center mt-8">
					<Button
						type="primary"
						// className="text-purple-500 text-lg bg-gradient-to-br from-blue-50 via-purple-50 via-purple-100 to-white to-90% "
						htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</AdminLayout>
	);
};

export default Info;

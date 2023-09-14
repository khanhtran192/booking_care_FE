import { readIdCard } from "@/axiosClient/endpoints";
import { Customer } from "@/axiosClient/types";
import Logo from "@/components/Logo";
import AppDatePicker, { FORMAT_DATE } from "@/components/fields/AppDatePicker";
import { BgUpload } from "@/components/fields/avatar";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/lib/AuthProvider";
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	Typography,
	message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, {
	use,
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";

const { Option } = Select;

const config = {
	rules: [{ required: true, message: "Hãy chọn ngày sinh của bạn!" }],
};

const Info: React.FC = () => {
	const router = useRouter();
	const { axiosAuth, user } = useAuth();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	useLayoutEffect(() => {
		if (user?.hospitalId) {
			router.replace(`/manage/hospitals/${user?.hospitalId}/edit`);
		}
		if (user?.doctorId) {
			router.replace(`/manage/doctors/${user?.doctorId}/edit`);
		}
	}, [router, user?.doctorId, user?.hospitalId]);

	//fetch data
	useEffect(() => {
		const fetchApi = async () => {
			setLoading(true);
			try {
				const response = await axiosAuth.get(`/customers/${user?.userId}`);
				setLoading(false);
				form.setFieldsValue(response as unknown as Customer);
			} catch (error) {
				setLoading(false);
				console.error("Error fetching data: ", error);
			}
		};
		!user?.hospitalId && user?.userId && fetchApi();
	}, [axiosAuth, user?.userId, form, user?.hospitalId]);

	const onFinish = useCallback(
		async (values: any) => {
			setLoading(true);
			try {
				if (!values?.id) {
					await axiosAuth.post("/customers", values);
					message.success("Thêm thông tin thành công");
				} else {
					await axiosAuth.put(`customers/${values.id}`, values);
					message.success("Cập nhật thông tin thành công");
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.error("Error updating user data: ", error);
			}
		},
		[axiosAuth]
	);

	const uploadImage = useCallback(
		async (e: any) => {
			setLoading(true);
			if (!e.image?.file) return;
			try {
				const readInfo = await readIdCard(e.image.file);
				form.setFieldsValue({
					fullName: readInfo?.name,
					address: readInfo?.address,
					dateOfBirth: readInfo?.dob
						? dayjs(readInfo?.dob, "DD/MM/YYYY").format(FORMAT_DATE)
						: undefined,
					gender: readInfo.sex,
					idCard: readInfo?.id,
				} as unknown as Customer);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log("error :", error);
				message.error("Không thể đọc thông tin CMND/CCCD");
			}
		},
		[form]
	);

	return (
		<AdminLayout>
			{!user?.hospitalId && (
				<>
					<Typography.Title level={3} className="!mb-8">
						Điền thông tin cá nhân hoặc gửi ảnh chụp CMND/CCCD để hệ thống tự
						động điền cho bạn
					</Typography.Title>
					<Row gutter={32}>
						<Col span={6}>
							<Form
								disabled={loading}
								layout="vertical"
								onValuesChange={uploadImage}>
								<Form.Item name="image" label={"Ảnh CMND/CCCD"}>
									<BgUpload width={675} height={425} />
								</Form.Item>
							</Form>
						</Col>
						<Col span={18}>
							<Form
								form={form}
								labelAlign="left"
								name="register"
								onFinish={onFinish}
								scrollToFirstError
								className="width-full"
								disabled={loading}
								layout="vertical">
								<Form.Item name="id" hidden>
									<Input />
								</Form.Item>
								<div className="flex [&>*]:flex-1 flex-wrap gap-x-4">
									<Form.Item
										name="fullName"
										label="Họ và tên"
										rules={[
											{
												required: true,
												message: "Vui lòng nhập họ tên của bạn",
											},
										]}>
										<Input />
									</Form.Item>
									<Form.Item name="dateOfBirth" label="Ngày sinh" {...config}>
										<AppDatePicker />
									</Form.Item>
								</div>
								<div className="flex [&>*]:flex-1 flex-wrap gap-x-4">
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
										rules={[
											{ required: true, message: "Vui lòng chọn giới tính!" },
										]}>
										<Select placeholder="Chọn giới tính">
											<Option value="NAM">Nam</Option>
											<Option value="NU">Nữ</Option>
										</Select>
									</Form.Item>
								</div>
								<div className="flex [&>*]:flex-1 flex-wrap gap-x-4">
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
										name="address"
										label="Địa chỉ"
										rules={[
											{
												required: true,
												message: "Địa chỉ là bắt buộc!",
											},
										]}>
										<Input />
									</Form.Item>
								</div>

								<Form.Item className="flex justify-center mt-8">
									<Button type="primary" htmlType="submit" loading={loading}>
										Submit
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</>
			)}
		</AdminLayout>
	);
};

export default Info;

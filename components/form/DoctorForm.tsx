import { Col, Form, Input, Rate, Row } from "antd";
import { FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";
import AppDatePicker from "../fields/AppDatePicker";
import ApiSelect from "../fields/select";
import { manageHospitalApi, uploadImage } from "@/axiosClient/endpoints";
import { useAuth } from "@/lib/AuthProvider";
import { useCallback } from "react";
import { DOCTORS, MANAGE_API } from "@/axiosClient/urls";
import { Doctor } from "@/axiosClient/types";

function DoctorForm({ initialValues, ...props }: FormPageProps) {
	const { user, axiosAuth } = useAuth();

	const handleFinish = useCallback(
		async ({ avatar, ...values }: any) => {
			let doctorId = initialValues?.id;
			if (initialValues) {
				await axiosAuth.put(`${DOCTORS}/${initialValues.id}`, values);
			} else {
				values.activated = true;
				values.hospitalId = user?.hospitalId;
				values.name = `${values.firstName} ${values.lastName}`;
				const newDoctor = (await axiosAuth.post(
					MANAGE_API.DOCTORS,
					values
				)) as Doctor;
				doctorId = newDoctor.id;
			}
			if (avatar && avatar.file) {
				await uploadImage(
					axiosAuth,
					`${DOCTORS}/${doctorId}/manage/upload`,
					avatar.file
				);
			}
		},
		[axiosAuth, initialValues, user?.hospitalId]
	);
	return (
		<FormPage initialValues={initialValues} onFinish={handleFinish} {...props}>
			<Row gutter={16}>
				<Col span={8} className="flex flex-col items-center">
					<Form.Item className="w-32 mb-0" name="avatar">
						<FormAvatar />
					</Form.Item>
					{initialValues && (
						<Form.Item name="star">
							<Rate disabled />
						</Form.Item>
					)}
				</Col>
				<Col span={16}>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name="email" label="Email">
								<Input />
							</Form.Item>
						</Col>
						{!initialValues ? (
							<>
								<Col span={12}>
									<Form.Item name="login" label="Tên đăng nhập">
										<Input />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="Họ" name="firstName">
										<Input />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="Tên" name="lastName">
										<Input />
									</Form.Item>
								</Col>
							</>
						) : (
							<Col span={12}>
								<Form.Item label="Họ Tên" name="name">
									<Input disabled />
								</Form.Item>
							</Col>
						)}
						<Col span={12}>
							<Form.Item label="Ngày sinh" name="dateOfBirth">
								<AppDatePicker />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="phoneNumber" label="Số điện thoại">
								<Input />
							</Form.Item>
						</Col>
					</Row>
				</Col>
			</Row>
			<div className="flex gap-4 [&>*]:flex-1">
				{initialValues && (
					<Form.Item name="degree" label="Bằng cấp">
						<Input />
					</Form.Item>
				)}
				{user?.doctorId ? (
					<Form.Item label="Phòng ban" name={["department", "departmentName"]}>
						<Input disabled />
					</Form.Item>
				) : (
					<ApiSelect
						url={(axios) =>
							manageHospitalApi
								.getDepartments(axios, user?.hospitalId as number, {
									size: 9999,
								})
								.then((data) => data.data)
						}
						labelKey="departmentName"
						name="departmentId"
						label="Phòng ban"
						placeholder="Chọn phòng ban"
					/>
				)}
			</div>
			{initialValues && (
				<Form.Item name="specialize" label="Mô tả">
					<FormEditor />
				</Form.Item>
			)}
		</FormPage>
	);
}

export default DoctorForm;

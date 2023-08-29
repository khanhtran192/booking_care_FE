import { Form, Input, Select } from "antd";
import { BgUpload, FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";
import { useCallback } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { HOSPITALS } from "@/axiosClient/urls";
import { Hospital } from "@/axiosClient/types";
import { uploadImage } from "@/axiosClient/endpoints";

const { Option } = Select;

function HospitalForm({ initialValues, ...props }: FormPageProps) {
	const { axiosAuth } = useAuth();
	const handleFinish = useCallback(
		async ({ logo, backgroundImage, ...values }: any) => {
			let hospitalId = initialValues?.id;
			values.workTime = "8h - 17h";
			values.workDay = "Thứ 2 - Thứ 7";
			if (initialValues) {
				await axiosAuth.put(`${HOSPITALS}/${hospitalId}`, values);
			} else {
				const createdHospital = (await axiosAuth.post(
					`/admin${HOSPITALS}`,
					values
				)) as Hospital;
				hospitalId = createdHospital.id;
			}

			if (logo?.file) {
				await uploadImage(
					axiosAuth,
					`${HOSPITALS}/${hospitalId}/manage/upload/logo`,
					logo.file
				);
			}
			if (backgroundImage?.file) {
				await uploadImage(
					axiosAuth,
					`${HOSPITALS}/${hospitalId}/manage/upload/background`,
					backgroundImage.file
				);
			}
		},
		[]
	);
	return (
		<FormPage initialValues={initialValues} onFinish={handleFinish} {...props}>
			<div className="relative">
				<Form.Item name="backgroundImage">
					<BgUpload width={1800} height={600} />
				</Form.Item>
				<div className="absolute bottom-4 left-4 flex bg-white bg-opacity-70 shadow-md gap-8 rounded items-center p-4">
					<Form.Item className="w-28 mb-0" name="logo">
						<FormAvatar />
					</Form.Item>
					<div>
						<Form.Item name="name">
							<Input placeholder="Tên bệnh viện" />
						</Form.Item>
						<Form.Item name="address">
							<Input placeholder="Địa chỉ" />
						</Form.Item>
					</div>
				</div>
			</div>
			<div className="flex gap-4 [&>*]:flex-1">
				{!initialValues && (
					<Form.Item name="login" label="Tên đăng nhập">
						<Input />
					</Form.Item>
				)}
				<Form.Item name="type" label="Loại cơ sở y tế" initialValue="BENH_VIEN">
					<Select placeholder="Chọn loại cơ sở y tế">
						<Option value="BENH_VIEN">Bệnh viện</Option>
						<Option value="PHONG_KHAM">Phòng khám</Option>
					</Select>
				</Form.Item>
				{/* <Form.Item name="procedure" label="Procedure">
          <Input />
        </Form.Item> */}
			</div>
			<div className="flex gap-4 [&>*]:flex-1">
				<Form.Item name="email" label="Email">
					<Input />
				</Form.Item>
				<Form.Item name="phoneNumber" label="Số điện thoại">
					<Input />
				</Form.Item>
			</div>
			{/* <div className="flex gap-4 [&>*]:flex-1">
				<Form.Item name="workDay" label="Work day">
					<Input />
				</Form.Item>
				<Form.Item name="workTime" label="Work time">
					<Input />
				</Form.Item>
			</div> */}

			<Form.Item name="description" label="Mô tả">
				<FormEditor />
			</Form.Item>
		</FormPage>
	);
}

export default HospitalForm;

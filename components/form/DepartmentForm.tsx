import { Form, Input } from "antd";
import { FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";
import { useCallback } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { MANAGE_API } from "@/axiosClient/urls";
import { Department } from "@/axiosClient/types";
import { uploadImage } from "@/axiosClient/endpoints";

function DepartmentForm({ initialValues, ...props }: FormPageProps) {
	const [form] = Form.useForm();
	const { axiosAuth, user } = useAuth();

	const handleFinish = useCallback(async ({ logo, ...values }: any) => {
		let departmentId;
		if (initialValues) {
			departmentId = initialValues?.id;
			await axiosAuth.put(
				`${MANAGE_API.DEPARTMENTS}/${initialValues.id}`,
				values
			);
		} else {
			const newDepartment = (await axiosAuth.post(MANAGE_API.DEPARTMENTS, {
				...values,
				hospitalId: user?.hospitalId,
			})) as Department;
			departmentId = newDepartment.id;
		}
		if (logo?.file) {
			await uploadImage(
				axiosAuth,
				`${MANAGE_API.DEPARTMENTS}/${departmentId}/upload/logo`,
				logo.file
			);
		}
	}, []);
	return (
		<FormPage
			form={form}
			initialValues={initialValues}
			onFinish={handleFinish}
			{...props}>
			<div className="flex gap-4 [&>*]:flex-1">
				<Form.Item className="w-28 mb-0" name="logo">
					<FormAvatar />
				</Form.Item>
				<Form.Item label="Tên phòng ban" name="departmentName">
					<Input />
				</Form.Item>
				<Form.Item name={"id"} hidden>
					<Input />
				</Form.Item>
			</div>
			<Form.Item name="description" label="Mô tả">
				<FormEditor />
			</Form.Item>
		</FormPage>
	);
}

export default DepartmentForm;

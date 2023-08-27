import { Form, Input } from "antd";
import { FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";

function DepartmentForm(props: FormPageProps) {
	return (
		<FormPage {...props}>
			<div className="flex gap-4 [&>*]:flex-1">
				<Form.Item className="w-28 mb-0" name="logo">
					<FormAvatar />
				</Form.Item>
				<Form.Item name="Tên phòng ban" label="departmentName">
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

import { Form, Input, Rate } from "antd";
import { FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";

function DoctorForm(props: FormPageProps) {
	return (
		<FormPage {...props}>
			<div className="flex gap-4 [&>*]:flex-1">
				<Form.Item className="w-28 mb-0" name="avatar">
					<FormAvatar />
				</Form.Item>
				<Form.Item name="Tên phòng ban" label="name">
					<Input />
				</Form.Item>
			</div>
			<div className="flex gap-4 [&>*]:flex-1">
				<Form.Item name="email" label="Email">
					<Input />
				</Form.Item>
				<Form.Item name="phoneNumber" label="Số điện thoại">
					<Input />
				</Form.Item>
			</div>
			<Form.Item name="rate" label="Đánh giá">
				<Rate />
			</Form.Item>
			<Form.Item name="degree" label="Bằng cấp">
				<Input />
			</Form.Item>
			<Form.Item name="specialize" label="Mô tả">
				<FormEditor />
			</Form.Item>
		</FormPage>
	);
}

export default DoctorForm;

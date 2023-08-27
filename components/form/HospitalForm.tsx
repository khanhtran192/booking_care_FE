import { Form, Input } from "antd";
import { BgUpload, FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";

function HospitalForm(props: FormPageProps) {
	return (
		<FormPage {...props}>
			<div className="relative">
				<Form.Item name="backgroundImage">
					<BgUpload />
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
				<Form.Item name="email" label="Email">
					<Input />
				</Form.Item>
				<Form.Item name="phoneNumber" label="Số điện thoại">
					<Input />
				</Form.Item>
			</div>
			<Form.Item name="description" label="Mô tả">
				<FormEditor />
			</Form.Item>
		</FormPage>
	);
}

export default HospitalForm;

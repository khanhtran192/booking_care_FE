import { Col, Form, Input, Rate, Row } from "antd";
import { FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";
import AppDatePicker from "../fields/AppDatePicker";

function DoctorForm(props: FormPageProps) {
	return (
		<FormPage {...props}>
			<Row gutter={16}>
				<Col span={8} className="flex flex-col items-center">
					<Form.Item className="w-32 mb-0" name="avatar">
						<FormAvatar />
					</Form.Item>
					<Form.Item name="star">
						<Rate />
					</Form.Item>
				</Col>
				<Col span={16}>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Họ Tên" name="name">
								<Input />
							</Form.Item>
							<Form.Item name="email" label="Email">
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Ngày sinh" name="dateOfBirth">
								<AppDatePicker />
							</Form.Item>
							<Form.Item name="phoneNumber" label="Số điện thoại">
								<Input />
							</Form.Item>
						</Col>
					</Row>
				</Col>
			</Row>
			<div className="flex gap-4 [&>*]:flex-1">
				<Form.Item name="degree" label="Bằng cấp">
					<Input />
				</Form.Item>
			</div>
			<Form.Item name="specialize" label="Mô tả">
				<FormEditor />
			</Form.Item>
		</FormPage>
	);
}

export default DoctorForm;

import { Col, Form, Input, Row } from "antd";
import { FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";

function HospitalForm(props: FormPageProps) {
	return (
		<FormPage {...props}>
			<Row>
				<Col span={8}>
					<Form.Item name="logo">
						<FormAvatar viewOnly={false} />
					</Form.Item>
				</Col>
				<Col span={16}>
					<div className="flex gap-4 [&>*]:flex-1">
						<Form.Item name="name" label="Tên bệnh viện">
							<Input />
						</Form.Item>
						<Form.Item name="address" label="Địa chỉ">
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
					<Form.Item name="description" label="Mô tả">
						<FormEditor />
					</Form.Item>
				</Col>
			</Row>
		</FormPage>
	);
}

export default HospitalForm;

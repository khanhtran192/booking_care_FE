import { Col, Form, Input, Row, Upload } from "antd";
import FormPage, { FormPageProps } from "./FormPage";

function HospitalForm(props: FormPageProps) {
	return (
		<FormPage {...props}>
			<Row>
				<Col span={8}>
					<Upload />
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
						<Input.TextArea rows={3} />
					</Form.Item>
				</Col>
			</Row>
		</FormPage>
	);
}

export default HospitalForm;

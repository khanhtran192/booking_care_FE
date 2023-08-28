import { Form, Input } from "antd";
import AppDatePicker from "../fields/AppDatePicker";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";

function OrderForm(props: FormPageProps) {
	return (
		<FormPage {...props}>
			<Form.Item className="w-28 mb-0" name="date">
				<AppDatePicker />
			</Form.Item>
			<Form.Item name="Triệu chứng" label="symptom">
				<Input.TextArea />
			</Form.Item>
			<Form.Item name="description" label="Mô tả">
				<FormEditor />
			</Form.Item>
		</FormPage>
	);
}

export default OrderForm;

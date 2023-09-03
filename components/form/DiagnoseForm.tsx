import { orderApi } from "@/axiosClient/endpoints";
import { useAuth } from "@/lib/AuthProvider";
import { useAuthFetch } from "@/lib/hooks";
import { Button, Collapse, Form, Typography } from "antd";
import { useCallback } from "react";
import { FormEditor } from "../fields/editor";
import FormPage from "./FormPage";

type Props = {
	orderId: number | string;
};

function DiagnoseForm({ orderId }: Props) {
	const [form] = Form.useForm();
	const { axiosAuth } = useAuth();

	const handleFinish = useCallback(
		async (values: any) => {
			return await orderApi.diagnose(axiosAuth, orderId, values);
		},
		[axiosAuth, orderId]
	);

	return (
		<Collapse className="mt-8" ghost expandIconPosition="end">
			<Collapse.Panel
				showArrow={false}
				header={
					<Button type="primary" size="large">
						Thêm kết quả khám
					</Button>
				}
				key="1">
				<FormPage form={form} onFinish={handleFinish}>
					<Form.Item label="Mô tả" name="description">
						<FormEditor />
					</Form.Item>
				</FormPage>
			</Collapse.Panel>
		</Collapse>
	);
}

export function DiagnoseDetail({ orderId }: Props) {
	const { data } = useAuthFetch<{ description: string }>(
		`orders/${orderId}/diagnose`
	);

	return (
		<div className="mt-8">
			<Typography.Title className="!text-2xl" level={2}>
				Kết quả khám
			</Typography.Title>
			<div
				className="mt-8"
				dangerouslySetInnerHTML={{
					__html: data?.description || "",
				}}></div>
		</div>
	);
}

export default DiagnoseForm;

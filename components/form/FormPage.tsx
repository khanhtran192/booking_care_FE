import { App, Button, Form, FormProps } from "antd";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export interface FormPageProps extends FormProps {
	action?: string;
}

function FormPage({
	initialValues,
	action,
	children,
	onFinish,
	...props
}: FormPageProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { message } = App.useApp();

	const handleFinish = useCallback(
		async (values: any) => {
			setLoading(true);
			try {
				await onFinish?.(values);

				if (initialValues) {
					message.success("Sửa bản ghi thành công!");
				} else {
					message.success("Tạo bản ghi thành công!");
				}
				setLoading(false);
				router.back();
			} catch (error) {
				setLoading(false);

				message.error("Có lỗi xảy ra!");
				console.log(error);
			}
		},
		[initialValues, message, onFinish, router]
	);

	return (
		<Form
			layout="vertical"
			onFinish={handleFinish}
			initialValues={initialValues}
			disabled={loading}
			{...props}>
			{children as any}
			<div className="flex justify-end gap-4">
				<Button
					danger
					onClick={() => {
						router.back();
					}}>
					Hủy
				</Button>
				<Button loading={loading} type="primary" htmlType="submit">
					Lưu
				</Button>
			</div>
		</Form>
	);
}

export default FormPage;

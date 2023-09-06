import { TIME_SLOT_VALUES } from "@/axiosClient/urls";
import { useAuth } from "@/lib/AuthProvider";
import {
	Button,
	Form,
	Input,
	InputNumber,
	Modal,
	ModalProps,
	TimePicker,
	Typography,
	message,
} from "antd";
import {
	Ref,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";
import ApiSelect from "../fields/select";
import { FORMAT_HOUR } from "@/global/constants";
import dayjs from "dayjs";

export type FormDrawerRef = {
	open: (initialValues?: any) => void;
	close: () => void;
};

interface FormDrawerProps extends ModalProps {
	postUrl: string | ((values: any) => string);
	putUrl: string | ((values: any) => string);
	initialValues?: any;
}

const getDayjs = (time?: string) => {
	return time ? dayjs(time, FORMAT_HOUR) : undefined;
};

function TimeSlotFormDrawer(
	{ postUrl, putUrl, initialValues, ...props }: FormDrawerProps,
	ref: Ref<FormDrawerRef>
) {
	const [form] = Form.useForm();
	const [open, setOpen] = useState<"edit" | "add" | undefined>();
	const { axiosAuth } = useAuth();
	const [loading, setLoading] = useState(false);
	const isEdit = open === "edit";

	const close = useCallback(() => {
		setOpen(undefined);
		form.resetFields();
	}, [form]);

	useImperativeHandle(
		ref,
		() => ({
			open: (initialValues) => {
				setOpen(initialValues ? "edit" : "add");
				const time = [
					getDayjs(initialValues?.startTime?.value),
					getDayjs(initialValues?.endTime?.value),
				];
				form.setFieldsValue({ ...initialValues, time });
			},
			close,
		}),
		[close, form]
	);

	const handleFinish = useCallback(
		async ({ time, ...values }: any) => {
			const newValues = {
				...values,
				startTime: time[0]?.format(FORMAT_HOUR),
				endTime: time[1]?.format(FORMAT_HOUR),
			};
			const getUrl = (func: FormDrawerProps["postUrl"]) =>
				typeof func === "function" ? func(newValues) : func;
			setLoading(true);
			try {
				if (isEdit) {
					await axiosAuth.post(getUrl(postUrl), newValues);
					message.success("Thêm thành công");
				} else {
					await axiosAuth.put(getUrl(putUrl), newValues);
					message.success("Sửa thành công");
				}
				setLoading(false);
				close();
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		},
		[isEdit, close, axiosAuth, postUrl, putUrl]
	);

	const text = isEdit ? "Sửa" : "Thêm";

	return (
		<Modal
			title={
				<Typography.Title
					level={3}
					className="!mb-8">{`${text} ca khám`}</Typography.Title>
			}
			open={!!open}
			onCancel={close}
			onOk={form.submit}
			cancelText="Hủy"
			destroyOnClose={false}
			cancelButtonProps={{ loading, danger: true }}
			okButtonProps={{ loading }}
			okText={text}
			{...props}>
			<Form
				form={form}
				layout="vertical"
				disabled={loading}
				onFinish={handleFinish}>
				<Form.Item name="id" hidden>
					<Input />
				</Form.Item>
				<Form.Item name="packId" hidden>
					<Input />
				</Form.Item>
				<Form.Item name="doctorId" hidden>
					<Input />
				</Form.Item>
				<Form.Item name="time" label="Thời gian khám">
					<TimePicker.RangePicker
						className="w-full"
						use12Hours
						minuteStep={30}
						format={FORMAT_HOUR}
						placeholder={["Bắt đầu", "Kết thúc"]}
						disabledTime={(current) => ({
							disabledHours: () => [0, 1, 2, 3, 4, 5, 19, 20, 21, 22, 23],
						})}
					/>
				</Form.Item>
				<Form.Item label="Giá tiền" name="price">
					<InputNumber className="w-full" />
				</Form.Item>
				<Form.Item label="Mô tả" name="description">
					<Input.TextArea />
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default forwardRef(TimeSlotFormDrawer);

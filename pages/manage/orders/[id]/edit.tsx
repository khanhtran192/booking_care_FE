import { OrderInfo, TimeSlot } from "@/axiosClient/types";
import { DOCTORS, HOSPITALS, PACKS } from "@/axiosClient/urls";
import AppDatePicker from "@/components/fields/AppDatePicker";
import TimeSlotSelect from "@/components/fields/TimeSlotSelect";
import { FormEditor } from "@/components/fields/editor";
import FormPage from "@/components/form/FormPage";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuthFetch } from "@/lib/hooks";
import {
	Button,
	Descriptions,
	DescriptionsProps,
	Form,
	Input,
	Typography,
	message,
} from "antd";
import { Axios } from "axios";
import { GetServerSideProps } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { DiagnoseDetail } from "@/components/form/DiagnoseForm";
import { ORDER_STATUS } from "@/global/constants";

type Props = {
	orderId: number | string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	params,
}) => {
	return {
		props: {
			orderId: params?.id as string,
		},
	};
};

function EditOrder({ orderId }: Props) {
	const [form] = Form.useForm();
	const { axiosAuth } = useAuth();
	const { data, loading } = useAuthFetch<OrderInfo>(`orders/${orderId}`);
	const [date, setDate] = useState<string>();
	const [idTimeSlot, setIdTimeSlot] = useState<number>();

	const fetchTimeSlot = useCallback(
		async (axiosAuth: Axios) => {
			if (!data || !date) {
				return;
			}
			let timeSlotUrl = "";
			if (data.doctor?.id) {
				timeSlotUrl += DOCTORS + "/" + data.doctor.id;
			} else {
				timeSlotUrl += HOSPITALS + PACKS + "/" + data.pack.id;
			}
			timeSlotUrl += "/time-slot-free?date=" + (date ?? data.date);
			const timeSlotList = (await axiosAuth.get(timeSlotUrl)) as TimeSlot[];
			if (timeSlotList.length === 0) {
				message.error("Không còn ca trống");
				setIdTimeSlot(undefined);
			} else {
				const oldTimeSlot = timeSlotList.find(
					(timeSlot) => timeSlot.id === data?.timeSlot?.id
				);
				setIdTimeSlot(oldTimeSlot ? oldTimeSlot.id : timeSlotList[0].id);
			}
			return timeSlotList;
		},
		[data, date]
	);

	const { data: dataTimeSlot } = useAuthFetch(fetchTimeSlot);

	useEffect(() => {
		if (data) {
			form.setFieldsValue({ ...data });
			setIdTimeSlot(data.timeSlot.id);
			setDate(data.date);
		}
	}, [data, form]);

	const handleFinish = useCallback(
		async (values: any) => {
			const sendData = {
				...values,
				timeSlot: idTimeSlot,
			};
			console.log(sendData);
			await axiosAuth.put("/order/" + orderId, sendData);
		},
		[axiosAuth, idTimeSlot, orderId]
	);

	const items: DescriptionsProps["items"] = useMemo(
		() => [
			{
				key: "3",
				label: "Bệnh viện",
				children: (
					<p>
						{data?.doctor?.department?.hospital?.name ??
							data?.pack?.hospital?.name}
					</p>
				),
			},
			{
				key: "4",
				label: "Địa chỉ khám",
				children: <p>{data?.address}</p>,
			},
			{
				key: "4",
				label: "Bác sỹ khám",
				children: <p>{data?.doctor?.name}</p>,
			},
			{
				key: "5",
				label: "Gói khám",
				children: <p>{data?.pack?.name}</p>,
			},
		],
		[data]
	);

	return (
		<AdminLayout>
			<Descriptions
				bordered
				column={2}
				layout="vertical"
				title={
					<Typography.Title className="!text-2xl" level={1}>
						Chi tiết đơn khám
					</Typography.Title>
				}
				items={items}></Descriptions>

			<FormPage
				className="mt-8"
				form={form}
				disabled={loading || data?.status === ORDER_STATUS.COMPLETE}
				onFinish={handleFinish}>
				<Form.Item name="date" label="Ngày khám">
					<AppDatePicker onChange={setDate} />
				</Form.Item>
				<Form.Item label="Thời gian khám">
					<div className="flex flex-wrap gap-4">
						{dataTimeSlot?.map?.((timeSlot: any) => (
							<Button
								type={idTimeSlot === timeSlot.id ? "primary" : "default"}
								key={timeSlot.id}
								value={timeSlot.id}
								onClick={() => setIdTimeSlot(timeSlot.id)}>
								{timeSlot.time}
							</Button>
						))}
					</div>
				</Form.Item>
				<Form.Item label="Triệu chứng" name="symptom">
					<Input.TextArea />
				</Form.Item>
			</FormPage>
			{data?.status === ORDER_STATUS.COMPLETE && (
				<DiagnoseDetail orderId={orderId} />
			)}
		</AdminLayout>
	);
}

export default EditOrder;

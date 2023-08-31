import { OrderInfo, TimeSlot } from "@/axiosClient/types";
import { DOCTORS, HOSPITALS, PACKS } from "@/axiosClient/urls";
import AppDatePicker from "@/components/fields/AppDatePicker";
import TimeSlotSelect from "@/components/fields/TimeSlotSelect";
import { FormEditor } from "@/components/fields/editor";
import FormPage from "@/components/form/FormPage";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuthFetch } from "@/lib/hooks";
import { Button, Form, Input, message } from "antd";
import { Axios } from "axios";
import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import {useAuth} from "@/lib/AuthProvider";


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
	const {axiosAuth} = useAuth()
	const { data, loading } = useAuthFetch<OrderInfo>(`orders/${orderId}`);
	const [date, setDate] = useState<string>();
	const [idTimeSlot, setIdTimeSlot] = useState<number>();

	const fetchTimeSlot = useCallback(
		async (axiosAuth: Axios) => {
			if (!data || !date) {
				return;
			}
			let timeSlotUrl = HOSPITALS;
			if (data.doctor?.id) {
				timeSlotUrl += DOCTORS + "/" + data.doctor.id;
			} else {
				timeSlotUrl += PACKS + "/" + data.pack.id;
			}
			timeSlotUrl += "/time-slot-free?date=" + (date ?? data.date);
			console.log("timeSlotUrl :", timeSlotUrl);
			return (await axiosAuth.get(timeSlotUrl)) as TimeSlot[];
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
		[idTimeSlot]
	);

	return (
		<AdminLayout>
			<FormPage form={form} disabled={loading} onFinish={handleFinish}>
				<Form.Item name="date" label="Ngày khám">
					<AppDatePicker onChange={setDate} />
				</Form.Item>
				<Form.Item label="Thời gian khám" >
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
		</AdminLayout>
	);
}

export default EditOrder;

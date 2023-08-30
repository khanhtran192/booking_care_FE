import { TimeSlot } from "@/axiosClient/types";
import { cn } from "@/lib/utils";
import { LeftCircleOutlined } from "@ant-design/icons";
import {
	Button,
	Form,
	FormProps,
	Input,
	message,
	Space,
	Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import useSWR from "swr";
import AppDatePicker, { FORMAT_DATE } from "@/components/fields/AppDatePicker";
import { useAuth } from "@/lib/AuthProvider";
import { useRouter } from "next/router";

interface BookFormProps extends FormProps {
	doctorId?: Number;
	packId?: Number;
	urlTimeSlotFree: string;
}

function BookForm({
	doctorId,
	packId,
	urlTimeSlotFree,
	...props
}: BookFormProps) {
	const { axiosAuth } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [idTimeSlot, setIdTimeSlot] = useState<number>();
	const [dateSelect, setDateSelect] = useState<string | undefined>(
		dayjs().add(1).format(FORMAT_DATE)
	);
	const { data } = useSWR(
		urlTimeSlotFree,
		(url) =>
			axiosAuth.get(url, { params: { date: dateSelect } }) as Promise<
				TimeSlot[]
			>
	);

	const handleClickTimeSLot = (id: number) => {
		setOpen(true);
		setIdTimeSlot(id);
	};

	const onFinish = async (values: any) => {
		setLoading(true);
		const dataToSend = {
			...values,
			timeSlot: idTimeSlot,
		};
		try {
			if (doctorId) {
				await axiosAuth.post(
					`/hospitals/doctors/${doctorId}/booking`,
					dataToSend
				);
			}
			if (packId) {
				await axiosAuth.post(`/hospitals/packs/${packId}/booking`, dataToSend);
			}
			message.success("Đặt lịch khám thành công!");
			setLoading(false);
			router.push("/manage/orders");
		} catch (err) {
			console.log(err);
			setLoading(false);
			message.error("Có lỗi xảy ra!");
		}
	};
	return (
		<Form
			layout="vertical"
			initialValues={{ date: dateSelect }}
			disabled={loading}
			{...props}
			onFinish={onFinish}>
			<div className="flex justify-between items-center">
				<div className="flex">
					<Button
						className={cn(
							"inline-flex items-center justify-center",
							!open ? "hidden" : ""
						)}
						htmlType="button"
						type="text"
						icon={<LeftCircleOutlined />}
						onClick={() => {
							setOpen(false);
						}}></Button>

					<Typography.Title className="!mb-0" level={3}>
						Lịch khám
					</Typography.Title>
				</div>
				<Form.Item name="date" noStyle>
					<AppDatePicker
						className="max-w-[200px]"
						onChange={(date) => {
							setDateSelect(date);
						}}
					/>
				</Form.Item>
			</div>
			<div className={cn("flex flex-wrap mt-4", open ? "flex-col" : "gap-4")}>
				<Form.Item noStyle hidden={open}>
					{data?.map?.((timeSlot: any) => (
						<Button
							key={timeSlot.id}
							value={timeSlot.id}
							onClick={() => handleClickTimeSLot(timeSlot.id)}>
							{timeSlot.time}
						</Button>
					))}
				</Form.Item>

				<Form.Item noStyle hidden={!open}>
					<Form.Item
						name="symptom"
						label="Mô tả các triệu chứng"
						rules={[{ required: true }]}>
						<Input.TextArea rows={3} />
					</Form.Item>
					<Button htmlType="submit" type="primary" loading={loading}>
						Gửi yêu cầu khám bệnh
					</Button>
				</Form.Item>
			</div>
			<Space className="pt-4">
				<div>Chọn</div>
				<div>
					<svg
						viewBox="0 0 448 512"
						preserveAspectRatio="none"
						width="14"
						fill="#333"
						height="16">
						<path d="M105.6 83.2v86.177a115.52 115.52 0 0 0-22.4-2.176c-47.914 0-83.2 35.072-83.2 92 0 45.314 48.537 57.002 78.784 75.707 12.413 7.735 23.317 16.994 33.253 25.851l.146.131.148.129C129.807 376.338 136 384.236 136 391.2v2.679c-4.952 5.747-8 13.536-8 22.12v64c0 17.673 12.894 32 28.8 32h230.4c15.906 0 28.8-14.327 28.8-32v-64c0-8.584-3.048-16.373-8-22.12V391.2c0-28.688 40-67.137 40-127.2v-21.299c0-62.542-38.658-98.8-91.145-99.94-17.813-12.482-40.785-18.491-62.791-15.985A93.148 93.148 0 0 0 272 118.847V83.2C272 37.765 234.416 0 188.8 0c-45.099 0-83.2 38.101-83.2 83.2zm118.4 0v91.026c14.669-12.837 42.825-14.415 61.05 4.95 19.646-11.227 45.624-1.687 53.625 12.925 39.128-6.524 61.325 10.076 61.325 50.6V264c0 45.491-35.913 77.21-39.676 120H183.571c-2.964-25.239-21.222-42.966-39.596-59.075-12.65-11.275-25.3-21.725-39.875-30.799C80.712 279.645 48 267.994 48 259.2c0-23.375 8.8-44 35.2-44 35.2 0 53.075 26.4 70.4 26.4V83.2c0-18.425 16.5-35.2 35.2-35.2 18.975 0 35.2 16.225 35.2 35.2zM352 424c13.255 0 24 10.745 24 24s-10.745 24-24 24-24-10.745-24-24 10.745-24 24-24z"></path>
					</svg>
				</div>
				<div>và đặt ( Phí đặt lịch 0đ)</div>
			</Space>
		</Form>
	);
}

export default BookForm;

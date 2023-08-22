import { TimeSlot } from "@/axiosClient/types";
import { cn } from "@/lib/utils";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, FormProps, Input, Typography } from "antd";
import React, { useCallback } from "react";

interface BookFormProps extends FormProps {
	data: TimeSlot[];
}

function BookForm({ data, ...props }: BookFormProps) {
	const [open, setOpen] = React.useState(false);
	const handleClickTimeSLot = useCallback(() => {
		setOpen(true);
	}, []);
	console.log(data)
	return (
		<Form layout="vertical" {...props}>
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
					<DatePicker />
				</Form.Item>
			</div>
			<div className={cn("flex flex-wrap mt-4", open ? "flex-col" : "gap-4")}>
				<Form.Item name="timeSlot" noStyle hidden={open}>
					{data?.map((timeSlot: any) => (
						<Button
							key={timeSlot.id}
							value={timeSlot.id}
							onClick={handleClickTimeSLot}>
							{timeSlot.time}
						</Button>
					))}
				</Form.Item>

				<Form.Item noStyle hidden={!open}>
					<Form.Item label="Mô tả các triệu chứng" rules={[{ required: true }]}>
						<Input.TextArea rows={3} />
					</Form.Item>
					<Button htmlType="submit" type="primary">
						Gửi yêu cầu khám bệnh
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
}

export default BookForm;

import { TimeSlot } from "@/axiosClient/types";
import { useAuthFetch } from "@/lib/hooks";
import { Button, Radio, RadioGroupProps } from "antd";
import React from "react";

interface TimeSlotSelectProps extends RadioGroupProps {
	url: string;
}

function TimeSlotSelect({ url, ...props }: TimeSlotSelectProps) {
	const { data } = useAuthFetch<TimeSlot[]>(url);

	return (
		<Radio.Group buttonStyle="solid" {...props}>
			{data?.map?.((timeSlot: any) => (
				<Radio.Button key={timeSlot.id} value={timeSlot.id}>
					{timeSlot.time}
				</Radio.Button>
			))}
		</Radio.Group>
	);
}

export default TimeSlotSelect;

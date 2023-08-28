import { cn } from "@/lib/utils";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useMemo } from "react";

export interface AppDatePickerProps
	extends Omit<DatePickerProps, "value" | "onChange" | "picker"> {
	value?: string;
	onChange?: (date?: string) => void;
}

const FORMAT_DATE = "YYYY-MM-DD";

function AppDatePicker({
	className,
	value,
	onChange,
	...props
}: AppDatePickerProps) {
	const handledValue = useMemo(() => {
		return value ? dayjs(value, FORMAT_DATE) : undefined;
	}, [value]);

	const handleValueChange = useCallback<
		NonNullable<DatePickerProps["onChange"]>
	>(
		(date) => {
			onChange?.(date ? date.format(FORMAT_DATE) : undefined);
		},
		[onChange]
	);

	return (
		<DatePicker
			value={handledValue}
			className={cn("w-full", className)}
			picker="date"
			format={FORMAT_DATE}
			onChange={handleValueChange}
			{...props}
		/>
	);
}

export default AppDatePicker;

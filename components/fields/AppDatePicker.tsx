import { cn } from "@/lib/utils";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useMemo } from "react";

export interface AppDatePickerProps
	extends Omit<DatePickerProps, "value" | "onChange" | "picker"> {
	value?: string;
	onChange?: (date?: string) => void;
}

export const FORMAT_DATE = "YYYY-MM-DD";

function AppDatePicker({
	className,
	value,
	onChange,
	format = FORMAT_DATE,
	...props
}: AppDatePickerProps) {
	const handledValue = useMemo(() => {
		return value ? dayjs(value, format as any) : undefined;
	}, [value, format]);

	const handleValueChange = useCallback<
		NonNullable<DatePickerProps["onChange"]>
	>(
		(date) => {
			onChange?.(date ? date.format(format as any) : undefined);
		},
		[onChange, format]
	);

	return (
		<DatePicker
			value={handledValue}
			className={cn("w-full", className)}
			picker="date"
			format={format}
			onChange={handleValueChange}
			{...props}
		/>
	);
}

export default AppDatePicker;

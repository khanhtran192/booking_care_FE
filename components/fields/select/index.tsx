import { useAuthFetch } from "@/lib/hooks";
import { Form, Select, SelectProps } from "antd";
import { NamePath } from "antd/es/form/interface";
import React, { useMemo } from "react";

interface ApiSelectProps<T> extends SelectProps {
	url: Parameters<typeof useAuthFetch<T[]>>[0];
	params?: Parameters<typeof useAuthFetch<T[]>>[1];
	labelKey: keyof T;
	valueKey?: keyof T;
	name?: NamePath;
	label?: string;
}

function ApiSelect<T>({
	url,
	params,
	name,
	label,
	valueKey = "id" as keyof T,
	labelKey = valueKey,
	...props
}: ApiSelectProps<T>) {
	const { data, loading } = useAuthFetch<T[]>(url, params);

	const options = useMemo(() => {
		if (!data) return [];
		return data.map((item) => ({
			label: item[labelKey] as string,
			value: item[valueKey] as string,
		}));
	}, [data, labelKey, valueKey]);

	return (
		<Form.Item name={name} label={label}>
			<Select
				showSearch
				loading={loading}
				{...props}
				filterOption={(input, option) => {
					if (option) {
						return Boolean(
							(option?.label &&
								(option.label + "")
									.toLowerCase()
									.indexOf(input.replace(/\s/g, "").toLowerCase()) >= 0) ||
								(option?.value &&
									(option.value + "")
										.toLowerCase()
										.indexOf(input.replace(/\s/g, "").toLowerCase()) >= 0)
						);
					} else {
						return false;
					}
				}}
				options={options}
			/>
		</Form.Item>
	);
}

export default ApiSelect;

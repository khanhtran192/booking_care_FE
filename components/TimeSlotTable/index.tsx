import React, { useCallback, useRef } from "react";
import { managePackApi } from "@/axiosClient/endpoints";
import { TimeSlot } from "@/axiosClient/types";
import AdminTable, { AdminTableProps } from "../AdminTable";
import TimeSlotFormDrawer, { FormDrawerRef } from "./TimeSlotFormDrawer";
import { MANAGE_API } from "@/axiosClient/urls";

const timeSLotColumns: AdminTableProps<TimeSlot>["columns"] = [
	{
		dataIndex: "time",
		title: "Thời gian",
	},
	{
		dataIndex: "price",
		title: "Giá tiền",
	},
	{
		dataIndex: "description",
		title: "Mô tả",
	},
];

function TimeSlotTable({
	getApi,
	packId,
	doctorId,
	...props
}: AdminTableProps<TimeSlot> & {
	packId?: number | string;
	doctorId?: number | string;
}) {
	const formRef = useRef<FormDrawerRef>(null);

	const openForm = useCallback(
		(record?: TimeSlot) => {
			formRef.current?.open({
				...record,
				packId,
				doctorId,
			});
		},
		[doctorId, packId]
	);
	return (
		<>
			<AdminTable
				columns={timeSLotColumns}
				onCreate={openForm}
				onEdit={openForm}
				getApi={(axiosAuth) =>
					getApi(axiosAuth, {
						page: 0,
						size: 100,
					})
				}
				toggleApi={(axiosAuth, record) =>
					managePackApi.toggleTimeSlot(axiosAuth, record.id, record.active)
				}
				pagination={false}
				{...props}
			/>
			<TimeSlotFormDrawer
				ref={formRef}
				postUrl={MANAGE_API.TIME_SLOTS}
				putUrl={({ id }) => `${MANAGE_API.TIME_SLOTS}/${id}`}
			/>
		</>
	);
}

export default TimeSlotTable;

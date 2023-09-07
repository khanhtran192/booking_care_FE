import React, { useCallback, useRef } from "react";
import { managePackApi } from "@/axiosClient/endpoints";
import { TimeSlot } from "@/axiosClient/types";
import AdminTable, { AdminTableProps } from "../AdminTable";
import TimeSlotFormDrawer, { FormDrawerRef } from "./TimeSlotFormDrawer";
import { MANAGE_API } from "@/axiosClient/urls";
import { Axios } from "axios";

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
			formRef.current?.open(
				{
					...record,
					packId,
					doctorId,
				},
				record ? "edit" : "add"
			);
		},
		[doctorId, packId]
	);

	const getData = useCallback(
		(axiosAuth: Axios) =>
			getApi(axiosAuth, {
				page: 0,
				size: 100,
			}),
		[packId, doctorId]
	);
	return (
		<>
			<AdminTable
				columns={timeSLotColumns}
				onCreate={openForm}
				onEdit={openForm}
				getApi={getData}
				toggleApi={(axiosAuth, record) =>
					managePackApi.toggleTimeSlot(axiosAuth, record.id, record.active)
				}
				pagination={false}
				{...props}
			/>
			<TimeSlotFormDrawer
				ref={formRef}
				postUrl={packId ? MANAGE_API.TIME_SLOTS : MANAGE_API.DOCTOR_TIME_SLOTS}
				putUrl={({ id }) =>
					packId
						? `${MANAGE_API.TIME_SLOTS}/${id}`
						: `${MANAGE_API.DOCTOR_TIME_SLOTS}/${id}`
				}
			/>
		</>
	);
}

export default TimeSlotTable;

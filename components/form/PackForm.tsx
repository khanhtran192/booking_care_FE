import {manageDepartmentApi, manageHospitalApi, managePackApi} from "@/axiosClient/endpoints";
import {Department, Hospital, TimeSlot} from "@/axiosClient/types";
import { MANAGE_API } from "@/axiosClient/urls";
import { useAuth } from "@/lib/AuthProvider";
import {Form, Input, InputNumber, TableColumnsType, Typography} from "antd";
import { useCallback } from "react";
import AdminTable, { AdminTableProps } from "../AdminTable";
import { BgUpload, FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";
import {renderImage} from "@/lib/renderUtils";

const timeSLotColumns: TableColumnsType<TimeSlot> = [
	{
		dataIndex: "time",
		title: "Thời gian",
	},
	{
		dataIndex: "startTime",
		title: "Bắt đầu",
	},
	{
		dataIndex: "endTime",
		title: "Kết thúc",
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

const columns: TableColumnsType<Department> = [
	{
		width: 50,
		dataIndex: "logo",
		render: renderImage,
	},
	{
		title: "Tên",
		dataIndex: "departmentName",
		key: "name",
	},
];
function PackForm({ initialValues, ...props }: FormPageProps) {
	const { axiosAuth, user } = useAuth();
	const handleFinish = useCallback(
		async ({ logo, backgroundImage, ...values }: any) => {
			let packId = initialValues?.id;
			values.workTime = "8h - 17h";
			values.workDay = "Thứ 2 - Thứ 7";
			if (initialValues) {
				await axiosAuth.put(`${MANAGE_API.PACKS}/${packId}`, values);
			} else {
				const createdPack = (await axiosAuth.post(MANAGE_API.PACKS, {
					...values,
					hospitalId: user?.hospitalId,
				})) as Hospital;
				packId = createdPack.id;
			}

			// if (logo?.file) {
			// 	await uploadImage(
			// 		axiosAuth,
			// 		`${MANAGE_API.PACKS}/${packId}/upload/logo`,
			// 		logo.file
			// 	);
			// }
			if (backgroundImage?.file) {
			}
		},
		[]
	);
	return (
		<>
			<FormPage
				initialValues={initialValues}
				onFinish={handleFinish}
				{...props}>
				<div className="relative">
					<Form.Item name="backgroundImage">
						<BgUpload width={1800} height={600} />
					</Form.Item>
					<div className="absolute bottom-4 left-4 flex bg-white bg-opacity-70 shadow-md gap-8 rounded items-center p-4">
						<Form.Item className="w-28 mb-0" name="logo">
							<FormAvatar />
						</Form.Item>
						<div>
							<Form.Item name="name">
								<Input placeholder="Tên gói khám" />
							</Form.Item>
							<Form.Item name="price">
								<InputNumber className="w-full" placeholder="Giá" />
							</Form.Item>
						</div>
					</div>
				</div>
				<Form.Item name="description" label="Mô tả">
					<FormEditor />
				</Form.Item>
			</FormPage>
			<Typography.Title level={2} className="mt-16">
				Ca khám
			</Typography.Title>
			<AdminTable
				columns={timeSLotColumns}
				getApi={(axiosAuth, query) =>
					managePackApi.getTimeSlots(
						axiosAuth,
						1267,
						query
					)
				}
					pagination={false}

				// toggleApi={(axiosAuth, record) =>
				// 	manageDepartmentApi.toggleStatus(
				// 		axiosAuth,
				// 		record.id,
				// 		record.active as boolean
				// 	)
				// }
			/>
			{/*<AdminTable*/}
			{/*	columns={timeSLotColumns}*/}
			{/*	getApi={(axiosAuth, query) =>*/}
			{/*		managePackApi.getTimeSlots(axiosAuth, 1267 , query)*/}
			{/*	}*/}
			{/*	pagination={false}*/}
			{/*/>*/}
		</>
	);
}

export default PackForm;

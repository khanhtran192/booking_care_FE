import { managePackApi, uploadImage } from "@/axiosClient/endpoints";
import { Hospital } from "@/axiosClient/types";
import { MANAGE_API } from "@/axiosClient/urls";
import { useAuth } from "@/lib/AuthProvider";
import { Form, Input, InputNumber, Typography } from "antd";
import { useCallback } from "react";
import TimeSlotTable from "../TimeSlotTable";
import { BgUpload, FormAvatar } from "../fields/avatar";
import { FormEditor } from "../fields/editor";
import FormPage, { FormPageProps } from "./FormPage";

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

			if (logo?.file) {
				await uploadImage(
					axiosAuth,
					`${MANAGE_API.PACKS}/${packId}/upload/logo`,
					logo.file
				);
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
			{initialValues && (
				<>
					<Typography.Title level={2} className="mt-16">
						Ca khám
					</Typography.Title>
					<TimeSlotTable
						packId={initialValues?.id}
						getApi={(axiosAuth, query) =>
							managePackApi.getTimeSlots(axiosAuth, initialValues?.id, {
								page: query.page,
								size: query.size,
							})
						}
					/>
				</>
			)}
		</>
	);
}

export default PackForm;

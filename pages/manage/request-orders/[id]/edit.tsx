import { OrderInfo } from "@/axiosClient/types";
import DiagnoseForm, { DiagnoseDetail } from "@/components/form/DiagnoseForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { ORDER_STATUS } from "@/global/constants";
import { useAuthFetch } from "@/lib/hooks";
import { Button, Descriptions, DescriptionsProps, Typography } from "antd";
import { GetServerSideProps } from "next";
import { useMemo } from "react";

type Props = {
	orderId: number | string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	params,
}) => {
	return {
		props: {
			orderId: params?.id as string,
		},
	};
};

function EditOrder({ orderId }: Props) {
	const { data } = useAuthFetch<OrderInfo>(`orders/${orderId}`);

	const items: DescriptionsProps["items"] = useMemo(
		() => [
			{
				key: "1",
				label: "Ngày khám",
				children: <p>{data?.date}</p>,
			},
			{
				key: "2",
				label: "Thời gian khám",
				children: <Button type="primary">{data?.timeSlot.time}</Button>,
			},
			{
				key: "3",
				label: "Khách hàng",
				children: <p>{data?.customer.fullName}</p>,
			},
			{
				key: "4",
				label: "Địa chỉ khám",
				children: <p>{data?.address}</p>,
			},
			{
				key: "4",
				label: "Bác sỹ khám",
				children: <p>{data?.doctor?.name}</p>,
			},
			{
				key: "5",
				label: "Gói khám",
				children: <p>{data?.pack?.name}</p>,
			},
			{
				key: "6",
				label: "Triệu chứng",
				children: <p>{data?.symptom}</p>,
			},
		],
		[data]
	);

	return (
		<AdminLayout>
			<Descriptions
				bordered
				column={2}
				layout="vertical"
				title={
					<Typography.Title className="!text-2xl" level={1}>
						Chi tiết đơn khám
					</Typography.Title>
				}
				items={items}></Descriptions>
			{data?.status === ORDER_STATUS.APPROVED && (
				<DiagnoseForm orderId={orderId} />
			)}
			{data?.status === ORDER_STATUS.COMPLETE && (
				<DiagnoseDetail orderId={orderId} />
			)}
		</AdminLayout>
	);
}

export default EditOrder;

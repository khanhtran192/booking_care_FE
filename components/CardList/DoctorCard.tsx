import { cn } from "@/lib/utils";
import { Card, Avatar, Button, DatePicker, Typography } from "antd";
import Link from "next/link";
import React from "react";

const { Meta } = Card;

export type DetailCardProps = {
	id: string | number;
	title: string;
	image: string;
	desc: string;
	price: string;
	address: string;
	times: string[];
	isDetail?: boolean;
};

const DoctorCard: React.FC<DetailCardProps> = ({
	address,
	desc,
	image,
	price,
	times,
	title,
	id,
	isDetail,
}) => {
	return (
		<Card
			className={cn("mb-4 cursor-default", isDetail ? "pt-8 !shadow-none" : "")}
			hoverable={!isDetail}
			bordered={!isDetail}
			bodyStyle={{
				padding: isDetail ? 0 : "",
			}}>
			<Meta
				className="pb-4"
				avatar={
					<Link href={`doctors/${id}`}>
						<Avatar size={isDetail ? 120 : 80} src={image} />
					</Link>
				}
				title={
					<Link
						className={cn("", isDetail ? "text-3xl mb-2 block" : "")}
						href={`doctors/${id}`}>
						{title}
					</Link>
				}
				description={desc}
			/>
			<hr />
			<div className="mt-4 flex gap-4">
				<div className="w-1/2">
					<Typography.Title
						level={5}
						className="uppercase flex justify-between">
						Lịch khám
						<DatePicker />
					</Typography.Title>
					<div className="flex flex-wrap justify-between mt-4">
						{times.map((time, i) => (
							<Button className="mb-4" key={i}>
								{time}
							</Button>
						))}
					</div>
				</div>
				<div className="w-1/2">
					<Typography.Title level={5} className="uppercase">
						Địa chỉ
					</Typography.Title>
					<p>{address}</p>
					<hr className="my-4" />
					<Typography.Title level={5} className="uppercase">
						Giá khám:
						<span className="font-normal ml-2">{price}</span>
					</Typography.Title>
				</div>
			</div>
		</Card>
	);
};
export default DoctorCard;

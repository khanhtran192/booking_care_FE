import { cn } from "@/lib/utils";
import { Avatar, Card, Typography } from "antd";
import Link from "next/link";
import React from "react";

const { Meta } = Card;

export type DetailCardProps = {
	id: string | number;
	title: string;
	image: string;
	desc?: string;
	address: string;
	times?: string[];
	className?: string;
};

const DoctorCard: React.FC<DetailCardProps> = ({
	address,
	desc,
	image,
	className,
	title,
	id,
}) => {
	return (
		<Card
			className={cn("cursor-default [&>.ant-card-body]:flex", className)}
			hoverable
			bordered
			size="small">
			<Link href={`/doctors/${id}`}>
				<Avatar
					size={160}
					className="border border-solid border-purple-300"
					src={
						image ||
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1bCW97HV3Pdoboi7QnR8_8_KTCl28yyE6Q&usqp=CAU"
					}
				/>
			</Link>
			<div className="flex-1 ml-4">
				<Meta
					className="pb-4"
					title={
						<Link href={`/doctors/${id}`} className="text-xl">
							{title}
						</Link>
					}
					description={desc ?? "Nguyên Trưởng khoa Tai mũi họng trẻ em"}
				/>
				<hr />
				<div className="flex-1">
					<Typography.Title level={5}>Địa chỉ</Typography.Title>
					<p>{address}</p>
				</div>
				<div className="flex justify-center items-center pt-4">
					<Link key="link" href={`/doctors/${id}`}>
						Liên hệ ngay
					</Link>
				</div>
			</div>
		</Card>
	);
};
export default DoctorCard;

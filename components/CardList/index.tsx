import { Pagination, PaginationProps } from "antd";
import React from "react";
import DoctorCard, { DetailCardProps } from "./DoctorCard";

interface Props extends PaginationProps {
	data: DetailCardProps[];
}

function CardList({ data, className, ...props }: Props) {
	return (
		<>
			{data.map((card) => (
				<DoctorCard key={card.id} {...card} />
			))}
			<Pagination
				className="flex items-center justify-end"
				size="small"
				showSizeChanger
				showQuickJumper
				{...props}
			/>
		</>
	);
}

export default CardList;

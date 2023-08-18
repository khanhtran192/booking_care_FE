import { Pagination, PaginationProps } from "antd";
import React from "react";
import DoctorCard, { DetailCardProps } from "./DoctorCard";

export interface CardListProps extends PaginationProps {
	data: DetailCardProps[];
}

function CardList({ data, className, ...props }: CardListProps) {
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

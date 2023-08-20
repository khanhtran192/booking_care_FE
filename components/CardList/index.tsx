import AppPagination, { AppPaginationProps } from "./ListPagination";
import DetailCard, { DetailCardProps } from "./DetailCard";
import AppGrid from "../layout/AppGrid";

export interface CardListProps extends AppPaginationProps {
	data: DetailCardProps[];
}

function CardList({ data, className, ...props }: CardListProps) {
	return (
		<>
			<AppGrid className="grid-cols-2">
				{data.map((card) => (
					<DetailCard key={card.id} {...card} />
				))}
			</AppGrid>
			<AppPagination {...props} />
		</>
	);
}

export default CardList;

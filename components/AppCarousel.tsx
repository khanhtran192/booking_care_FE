import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import { ReactNode, useMemo } from "react";
import AppGrid from "./layout/AppGrid";

type CarouselProps<Item> = {
	children: ReactNode[];
};

const AppCarousel = <Item,>({ children }: CarouselProps<Item>) => {
	const items = useMemo(() => {
		return Array.from(
			{ length: Math.ceil(children.length / 4) },
			(_, index) => (
				<AppGrid key={index} className="!inline-grid">
					{children.slice(index * 4, index * 4 + 4)}
				</AppGrid>
			)
		);
	}, [children]);

	return (
		<Carousel autoplay pauseOnDotsHover autoplaySpeed={100000}>
			{items}
		</Carousel>
	);
};

export default AppCarousel;

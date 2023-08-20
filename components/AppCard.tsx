import { Card, CardProps } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Meta } = Card;

export interface AppCardProps extends CardProps {
	image: string;
	title: string;
	content?: string;
	href?: string;
}

function AppCard({
	image,
	title,
	content,
	href = "#",
	...props
}: AppCardProps) {
	return (
		<Card
			size="small"
			cover={
				<Link href={href}>
					<Image
						className="rounded-t-lg"
						src={image}
						width={278 * 2}
						height={156 * 2}
						alt="card image"
					/>
				</Link>
			}
			{...props}>
			<Meta title={<Link href={href}>{title}</Link>} description={content} />
		</Card>
	);
}

export default AppCard;

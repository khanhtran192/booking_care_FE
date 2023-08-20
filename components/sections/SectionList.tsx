import React from "react";
import AppContainer from "../layout/AppContainer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AppCarousel from "../AppCarousel";

type Props = {
	href?: string;
	title?: string;
	children: React.ReactNode[];
	className?: string;
};

function SectionList({ className, href = "/", title, children }: Props) {
	return (
		<section className={cn("py-16", className)}>
			<AppContainer>
				<div className="flex justify-between mb-4">
					<h3 className="text-lg font-bold ">{title}</h3>
					<Link href={href} className="text-orange-300">
						Xem thêm
					</Link>
				</div>
				<AppCarousel>{children}</AppCarousel>
			</AppContainer>
		</section>
	);
}

export default SectionList;

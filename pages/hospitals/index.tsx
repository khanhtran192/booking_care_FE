import AppCard, { CardProps } from "@/components/AppCard";
import Layout from "@/components/layout";
import ListLayout from "@/components/layout/ListLayout";
import React from "react";

type Props = {};

const hospitals: CardProps[] = Array(10).fill({
	small: true,
	title: "Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108",
	image:
		"https://cdn.bookingcare.vn/fr/w500/2019/07/31/085056logobenhvien108.jpg",
});

function Hospital({}: Props) {
	return (
		<Layout>
			<ListLayout title="Cơ sở y tế">
				<div className="flex gap-4 flex-wrap justify-center py-16">
					{hospitals.map((department, i) => (
						<div className="w-1/5" key={i}>
							<AppCard key={i} {...department} href={`hospitals/${i}`} />
						</div>
					))}
				</div>
			</ListLayout>
		</Layout>
	);
}

export default Hospital;

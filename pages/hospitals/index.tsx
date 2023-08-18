import { hospitalApi } from "@/axiosClient/endpoints";
import AppCard, { CardProps } from "@/components/AppCard";
import Layout from "@/components/layout";
import ListLayout from "@/components/layout/ListLayout";
import { GetServerSideProps } from "next";
import React from "react";

type Props = {
	hospitals: (CardProps & { id: string })[];
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const hospitals = await hospitalApi.get();
	return {
		props: {
			hospitals: hospitals.map(
				({ backgroundImage, name, ...hospital }: any) => ({
					...hospital,
					title: name,
					image:
						backgroundImage ||
						"https://img.freepik.com/premium-vector/hospital-building-exterior-modern-clinic-view_43633-7220.jpg",
					href: "doctors/" + hospital.id,
				})
			),
		},
	};
};

function Hospital({ hospitals }: Props) {
	return (
		<Layout>
			<ListLayout title="Cơ sở y tế">
				<div className="flex gap-4 flex-wrap justify-center py-16">
					{hospitals.map((hospital, i) => (
						<div className="w-1/5" key={hospital.id}>
							<AppCard {...hospital} href={`/hospitals/${i}`} small />
						</div>
					))}
				</div>
			</ListLayout>
		</Layout>
	);
}

export default Hospital;

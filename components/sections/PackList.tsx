import React from "react";
import AppGrid from "../layout/AppGrid";
import AppCard from "../AppCard";
import Link from "next/link";
import AppPagination, { AppPaginationProps } from "../CardList/ListPagination";
import { packApi } from "@/axiosClient/endpoints";

interface PackListProps
	extends Awaited<ReturnType<typeof packApi.get>>,
		Omit<AppPaginationProps, "total" | "defaultPageSize" | ""> {}

function PackList({ data, ...paginationProps }: PackListProps) {
	return (
		<>
			<AppGrid>
				{data.map((pack) => {
					return (
						<AppCard
							key={pack.id}
							href={"/packages/" + pack.id}
							image={
								pack.logo ||
								"https://cdn.thuvienphapluat.vn/phap-luat/2022/5/09/HN/kham-benh-chua-benh.png"
							}
							title={pack.name}
							content={pack.hospital.name}
							actions={[
								pack.price ?? "--",
								<Link key="detail" href={"/packages/" + pack.id}>
									Đặt ngay
								</Link>,
							]}
						/>
					);
				})}
			</AppGrid>
			<AppPagination {...paginationProps} />
		</>
	);
}

export default PackList;

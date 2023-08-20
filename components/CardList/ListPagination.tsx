import { Pagination, PaginationProps } from "antd";
import { useRouter } from "next/router";
import React from "react";

export interface AppPaginationProps extends PaginationProps {
	pageName?: string;
	pageSizeName?: string;
}

function AppPagination({
	pageName = "page",
	pageSizeName = "size",
	...props
}: AppPaginationProps) {
	const router = useRouter();

	return (
		<Pagination
			className="flex items-center justify-end mt-4"
			size="small"
			showSizeChanger
			showQuickJumper
			onChange={(page, size) => {
				const path = router.asPath.split("?");
				const currentPath = path[0];

				const search = new URLSearchParams(path[1]);
				search.set(pageName, (page - 1).toString());
				search.set(pageSizeName, size.toString());

				router.replace(currentPath + "?" + search.toString());
			}}
			{...props}
		/>
	);
}

export default AppPagination;

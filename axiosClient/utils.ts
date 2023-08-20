import { AppPaginationProps } from "@/components/CardList/ListPagination";
import { ApiResponse } from "./types";

export const convertApiResponseToAppPagination = <T>(
	apiResponse: ApiResponse<T>
): Pick<AppPaginationProps, "defaultCurrent" | "defaultPageSize" | "total"> & {
	data: T[];
} => {
	return {
		defaultCurrent: apiResponse.number + 1,
		defaultPageSize: apiResponse.size,
		total: apiResponse.totalElements,
		data: apiResponse.content,
	};
};

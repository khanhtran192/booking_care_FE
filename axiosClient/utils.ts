import { Axios } from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axiosClient from ".";
import { ApiResponse, PaginationData } from "./types";
import { getUser } from "./userStore";

export const convertApiResponseToAppPagination = <T>(
	apiResponse: ApiResponse<T>
): PaginationData<T> => {
	return {
		defaultCurrent: apiResponse.number + 1,
		defaultPageSize: apiResponse.size,
		total: apiResponse.totalElements,
		data: apiResponse.content,
	};
};

export function getServerPropsAuth<Props extends object>(
	callback: (ctx: GetServerSidePropsContext, axiosAuth: Axios) => Promise<Props>
): GetServerSideProps<Props> {
	return async (ctx) => {
		const token = getUser(ctx).id_token;
		const interceptorId = axiosClient.interceptors.request.use((config) => {
			config.headers.Authorization = `Bearer ${token}`;
			return config;
		});
		const props = await callback(ctx, axiosClient);
		axiosClient.interceptors.request.eject(interceptorId);
		return {
			props,
		};
	};
}

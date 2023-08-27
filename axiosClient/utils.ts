import { AppPaginationProps } from "@/components/CardList/ListPagination";
import { ApiResponse, PaginationData } from "./types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getUser } from "./userStore";
import axiosClient from ".";
import { Axios } from "axios";

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

export enum ROLE {
	ADMIN = "ROLE_ADMIN",
	DOCTOR = "ROLE_DOCTOR",
	USER = "ROLE_USER",
}

import axiosClient from ".";
import { Department, Doctor, Hospital, Pack } from "./types";
import { DEPARTMENTS, DOCTORS, HOSPITALS, PACKS } from "./urls";
import { convertApiResponseToAppPagination } from "./utils";

export type GetParamsType = {
	size?: number;
	page?: number;
	keyword?: number;
};

export const hospitalApi = {
	get: (params?: GetParamsType) =>
		axiosClient
			.get(HOSPITALS, { params })
			.then((data: any) => convertApiResponseToAppPagination<Hospital>(data)),
	getById: (id: number | string) =>
		axiosClient.get(`${HOSPITALS}/${id}`) as Promise<Hospital>,
	getDepartments: (id: number | string, params?: GetParamsType) =>
		axiosClient
			.get(`${HOSPITALS}/${id}/departments`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Department>(data)),
	getPackages: (id: number | string, params?: GetParamsType) =>
		axiosClient
			.get(`${HOSPITALS}/${id}${PACKS}`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Pack>(data)),
};

export const departmentApi = {
	getById: (id: number | string) =>
		axiosClient.get(`${DEPARTMENTS}/${id}`) as Promise<Department>,
	getDoctors: (id: number | string, params?: GetParamsType) =>
		axiosClient
			.get(`${DEPARTMENTS}/${id}${DOCTORS}`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Doctor>(data)),
};

export const doctorApi = {
	get: (params?: GetParamsType) =>
		axiosClient
			.get(DOCTORS, { params })
			.then((data: any) => convertApiResponseToAppPagination<Doctor>(data)),
	getById: (id: number | string) =>
		axiosClient.get(`${DOCTORS}/${id}`) as Promise<Doctor>,
};

export const packApi = {
	get: (params?: GetParamsType) =>
		axiosClient
			.get(PACKS, { params })
			.then((data: any) => convertApiResponseToAppPagination<Pack>(data)),
	getById: (id: number | string) =>
		axiosClient.get(`${PACKS}/${id}`) as Promise<Pack>,
};

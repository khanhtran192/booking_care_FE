import axiosClient from ".";
import { setToken } from "./userStore";
import {
	ApiResponse,
	Customer,
	Department,
	Diagnose,
	Doctor,
	Hospital,
	LoginInfo,
	OrderInfo,
	Pack,
	RegisterInfo,
	TimeSlot,
	UserInfo,
} from "./types";
import {
	DEPARTMENTS,
	DOCTORS,
	HOSPITALS,
	ORDERS,
	PACKS,
	TIME_SLOTS,
} from "./urls";
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

export const authApi = {
	login: (data: LoginInfo) =>
		axiosClient.post("/authenticate", data) as Promise<UserInfo>,
	register: (data: RegisterInfo) => {
		delete data.confirmPassword;
		data.langKey = "en";
		return axiosClient.post("/register", data) as Promise<any>;
	},
	getUserInfo: (token: string) =>
		axiosClient.get("/account", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}) as Promise<UserInfo>,
};

export const orderApi = {
	getOrders: (params?: GetParamsType) =>
		axiosClient.get(ORDERS + "/personal", { params }) as Promise<OrderInfo[]>,
	getOrderById: (id: number | string) =>
		axiosClient.get(`${ORDERS}/${id}`) as Promise<OrderInfo>,
	editOrder: (id: number | string, data: any) =>
		axiosClient.put(`/order/${id}`, data),
	cancel: (id: number | string) => axiosClient.put(`/order/${id}/cancel`),
	getDiagnose: (id: number | string) =>
		axiosClient.get(`/order/${id}/diagnose`) as Promise<Diagnose>,
};

export const manageHospitalApi = {
	getPacks: (id: number | string, params?: GetParamsType) =>
		axiosClient
			.get(`${HOSPITALS}/${id}/manage${PACKS}`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Pack>(data)),
	getDoctors: (id: number | string, params?: GetParamsType) =>
		axiosClient
			.get(`${HOSPITALS}/${id}/manage${DOCTORS}`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Doctor>(data)),
	getDepartments: (id: number | string, params?: GetParamsType) =>
		axiosClient
			.get(`${HOSPITALS}/${id}/manage${DEPARTMENTS}`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Department>(data)),
	getCustomers: (id: number | string, params?: GetParamsType) =>
		axiosClient
			.get(`${HOSPITALS}/${id}/manage/customer`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Customer>(data)),
	getPackTimeSlots: (id: number | string, params?: GetParamsType) =>
		axiosClient.get(`${HOSPITALS}/manage${PACKS}${id}${TIME_SLOTS}`, {
			params,
		}) as Promise<TimeSlot>,
};

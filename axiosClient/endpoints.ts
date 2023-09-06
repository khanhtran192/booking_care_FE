import axiosClient from ".";
import { setToken } from "./userStore";
import {
	ApiResponse,
	CMNDRes,
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
	MANAGE_API,
	ORDERS,
	PACKS,
	TIME_SLOTS,
} from "./urls";
import { convertApiResponseToAppPagination } from "./utils";
import axios, { Axios } from "axios";

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
	getOrders: (axiosAuth: Axios, params?: GetParamsType) =>
		axiosAuth
			.get(ORDERS + "/personal", { params })
			.then((data: any) => convertApiResponseToAppPagination<OrderInfo>(data)),
	getOrderById: (axiosAuth: Axios, id: number | string) =>
		axiosAuth.get(`${ORDERS}/${id}`) as Promise<OrderInfo>,
	editOrder: (axiosAuth: Axios, id: number | string, data: any) =>
		axiosAuth.put(`/order/${id}`, data),
	cancel: (axiosAuth: Axios, id: number | string) =>
		axiosAuth.put(`/order/${id}/cancel`),
	getDiagnose: (axiosAuth: Axios, id: number | string) =>
		axiosAuth.get(`${ORDERS}/${id}/diagnose`) as Promise<Diagnose>,
	diagnose: (axiosAuth: Axios, id: number | string, data: any) =>
		axiosAuth.post(`${ORDERS}/${id}/diagnose`, data) as Promise<Diagnose>,
};

export const adminManageApi = {
	getHospitals: (axiosAuth: Axios, params?: GetParamsType) =>
		axiosAuth
			.get(`${HOSPITALS}/manage`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Hospital>(data)),
	getHospitalById: hospitalApi.getById,
	toggleHospitalStatus: (
		axiosAuth: Axios,
		id: number | string,
		active?: boolean
	) => {
		return active
			? axiosAuth.delete(`${HOSPITALS}/manage/inactive/${id}`)
			: axiosAuth.put(`${HOSPITALS}/manage/hospital/${id}/active`);
	},
};

export const manageHospitalApi = {
	getPacks: (axiosAuth: Axios, id: number | string, params?: GetParamsType) =>
		axiosAuth
			.get(`${HOSPITALS}/${id}/manage${PACKS}`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Pack>(data)),
	getDoctors: (axiosAuth: Axios, id: number | string, params?: GetParamsType) =>
		axiosAuth
			.get(`${HOSPITALS}/${id}/manage${DOCTORS}`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Doctor>(data)),
	getDepartments: (
		axiosAuth: Axios,
		id: number | string,
		params?: GetParamsType
	) =>
		axiosAuth
			.get(`${HOSPITALS}/${id}/manage${DEPARTMENTS}`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Department>(data)),
	getCustomers: (
		axiosAuth: Axios,
		id: number | string,
		params?: GetParamsType
	) =>
		axiosAuth
			.get(`${HOSPITALS}/${id}/manage/customer`, { params })
			.then((data: any) => convertApiResponseToAppPagination<Customer>(data)),
	getPackTimeSlots: (
		axiosAuth: Axios,
		id: number | string,
		params?: GetParamsType
	) =>
		axiosAuth.get(`${MANAGE_API.PACKS}/${id}${TIME_SLOTS}`, {
			params,
		}) as Promise<TimeSlot>,
	getOrders: (axiosAuth: Axios, id: number | string, params?: GetParamsType) =>
		axiosAuth
			.get(`${HOSPITALS}/${id}/manage/order`, { params })
			.then((data: any) => convertApiResponseToAppPagination<OrderInfo>(data)),
};

export const manageDepartmentApi = {
	getById: (axiosAuth: Axios, id: number | string) => {
		return axiosAuth.get(
			`${MANAGE_API.DEPARTMENTS}/${id}`
		) as Promise<Department>;
	},
	toggleStatus: (axiosAuth: Axios, id: number | string, active: boolean) =>
		active
			? axiosAuth.delete(`${MANAGE_API.DEPARTMENTS}/${id}/inactive`)
			: axiosAuth.put(`${MANAGE_API.DEPARTMENTS}/${id}/active`),
};

export const managePackApi = {
	getById: (axiosAuth: Axios, id: number | string) =>
		axiosAuth.get(`${MANAGE_API.PACKS}/${id}`) as Promise<Pack>,
	toggleStatus: (axiosAuth: Axios, id: number | string, active: boolean) =>
		active
			? axiosAuth.delete(`${MANAGE_API.PACKS}/${id}/inactive`)
			: axiosAuth.put(`${MANAGE_API.PACKS}/${id}/active`),
	getTimeSlots: (
		axiosAuth: Axios,
		id: number | string,
		params?: GetParamsType
	) =>
		axiosAuth
			.get(`${MANAGE_API.PACKS}/${id}${TIME_SLOTS}`, {
				params,
			})
			.then((data: any) => convertApiResponseToAppPagination<TimeSlot>(data)),
	toggleTimeSlot: (axiosAuth: Axios, id: number | string, active: boolean) =>
		active
			? axiosAuth.delete(`${MANAGE_API.TIME_SLOTS}/${id}/inactive`)
			: axiosAuth.put(`${MANAGE_API.TIME_SLOTS}/${id}/active`),
};

export const manageDoctorApi = {
	getById: (axiosAuth: Axios, id: number | string) =>
		axiosAuth.get(`${MANAGE_API.DOCTORS}/${id}`) as Promise<Doctor>,
	toggleStatus: (axiosAuth: Axios, id: number | string, active: boolean) =>
		active
			? axiosAuth.delete(`${MANAGE_API.DOCTORS}/${id}/inactive`)
			: axiosAuth.put(`${MANAGE_API.DOCTORS}/${id}/active`),
};

export const readIdCard = (image: File) => {
	const formData = new FormData();
	formData.append("image", image);
	return axios
		.post("https://api.fpt.ai/vision/idr/vnm", formData, {
			headers: {
				"api-key": "y3RkEUnqyyDxevH8VvjjngoketMkUsBh",
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => {
			const data = res.data as CMNDRes;
			if (data.errorMessage) {
				return Promise.reject(data.errorMessage);
			}
			return Promise.resolve(data.data[0]);
		});
};

export function uploadImage(axiosAuth: Axios, url: string, file: File) {
	const formData = new FormData();
	formData.append("file", file);
	return axiosAuth.post(url, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}

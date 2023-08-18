import axiosClient from ".";
import { ApiResponse, Doctor, Hospital } from "./types";
import { DOCTORS, HOSPITALS } from "./urls";

export type GetParamsType = Record<string, any>;

export const hospitalApi = {
	get: (params?: GetParamsType) =>
		axiosClient.get(HOSPITALS, { params }) as Promise<Hospital[]>,
};

export const doctorApi = {
	get: (params?: GetParamsType) =>
		axiosClient.get(DOCTORS, { params }) as Promise<ApiResponse<Doctor>>,
};

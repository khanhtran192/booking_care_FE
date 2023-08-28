import type {
	AxiosError,
	AxiosInstance,
	AxiosRequestHeaders,
	AxiosResponse,
	CreateAxiosDefaults,
} from "axios";
import axios from "axios";
import { getCookie } from "cookies-next";
import queryString from "query-string";

const onResponse = (response: AxiosResponse) => {
	if (Math.floor(response.status / 100) === 2) {
		return response.data;
	}
	return Promise.reject(response);
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

const axiosDefault: CreateAxiosDefaults = {
	// baseURL: "https://booking-care-be.loca.lt/api/",
	baseURL: "http://localhost:3000/api/",
	//  baseURL: "http://192.168.1.43:8080/api/",
	//baseURL: "http://localhost:8080/api/",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${getCookie("id_token")}`,
	},
	paramsSerializer: (params) =>
		queryString.stringify(params || {}, {
			skipNull: true,
			arrayFormat: "comma",
		}),
};

const axiosClient: AxiosInstance = axios.create(axiosDefault);
export const axiosAuth: AxiosInstance = axios.create(axiosDefault);

// Interceptors
axiosClient.interceptors.request.use((config) => {
	config.headers = {
		"Content-Type": "application/json",
	} as AxiosRequestHeaders;
	return config;
});
axiosClient.interceptors.response.use(onResponse, onResponseError);
axiosAuth.interceptors.response.use(onResponse, onResponseError);

export default axiosClient;

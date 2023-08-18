import type {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosRequestHeaders,
	AxiosResponse,
} from "axios";
import axios from "axios";
import queryString from "query-string";

const onResponse = (response: AxiosResponse) => {
	if (response.status === 200) {
		return response.data;
	}
	return Promise.reject(response);
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

const axiosClient: AxiosInstance = axios.create({
	baseURL: "https://full-doodles-poke.loca.lt/api",
	headers: {
		"content-type": "application/json",
	},
	paramsSerializer: (params) =>
		queryString.stringify(params || {}, {
			skipNull: true,
			arrayFormat: "comma",
		}),
});

// Interceptors
axiosClient.interceptors.request.use((config) => {
	config.headers = {
		"Content-Type": "application/json",
	} as AxiosRequestHeaders;
	return config;
});
axiosClient.interceptors.response.use(onResponse, onResponseError);

export default axiosClient;

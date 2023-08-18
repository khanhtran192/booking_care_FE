import axiosClient from "@/axiosClient";
import useSWR from "swr";

const fetcher = (params?: Record<string, any>) => (url: string) =>
	axiosClient.get(url, { params }) as any;

export const useFetch = (url: string, params?: Record<string, any>) => {
	return useSWR(url, fetcher(params));
};

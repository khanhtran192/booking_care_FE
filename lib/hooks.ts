import axiosClient from "@/axiosClient";
import useSWR from "swr";
import { useCallback, useMemo, useState } from "react";

const fetcher = (params?: Record<string, any>) => (url: string) =>
		axiosClient.get(url, { params }) as any;

export const useFetch = (url: string, params?: Record<string, any>) => {
	return useSWR(url, fetcher(params));
};

export const usePost = <T extends (...arg: any[]) => Promise<any>>(api: T) => {
	const [loading, setLoading] = useState(false);

	const postFunction = useCallback<T>(async (...args) => {
		setLoading(true)
		try {
			const data = await api(...args);
			setLoading(false)
			return data;
		} catch (e) {
			console.log("error", e);
			setLoading(false);
		}
	}, [])

	return useMemo(() => ({
		loading,
		postFunction
	}), [loading, postFunction])
}
import axiosClient from "@/axiosClient";
import useSWR from "swr";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Axios } from "axios";

const fetcher = (params?: Record<string, any>) => (url: string) =>
	axiosClient.get(url, { params }) as any;

export const useFetch = (url: string, params?: Record<string, any>) => {
	return useSWR(url, fetcher(params));
};

export const usePost = <T extends (...arg: any[]) => Promise<any>>(api: T) => {
	const [loading, setLoading] = useState(false);

	const postFunction = useCallback<T>(async (...args) => {
		setLoading(true);
		try {
			const data = await api(...args);
			setLoading(false);
			return data;
		} catch (e) {
			console.log("error", e);
			setLoading(false);
		}
	}, []);

	return useMemo(
		() => ({
			loading,
			postFunction,
		}),
		[loading, postFunction]
	);
};

export const useAuthFetch = <T>(
	url:
		| string
		| ((axiosAuth: Axios, params?: Record<string, any>) => Promise<T>),
	params?: Record<string, any>
) => {
	const { axiosAuth } = useAuth();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T>();

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const data = (
					typeof url === "function"
						? await url(axiosAuth, params)
						: await axiosAuth.get(url, { params })
				) as T;
				setLoading(false);
				setData(data);
			} catch (e) {
				console.log("error", e);
				setLoading(false);
			}
		})();
	}, [axiosAuth, params, url]);

	return {
		loading,
		data,
	};
};

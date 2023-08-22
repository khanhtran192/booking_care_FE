export const getToken = () => {
	if (this && (this as any)?.localStorage)
		return localStorage?.getItem?.("access_token");
	return "";
};

export const setToken = (token: string) => {
	localStorage.setItem("access_token", token);
};

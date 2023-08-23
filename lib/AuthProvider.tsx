import { axiosAuth } from "@/axiosClient";
import { UserInfo } from "@/axiosClient/types";
import {
	deleteUser,
	getUser,
	setUser as setCookieUser,
} from "@/axiosClient/userStore";
import React, { useCallback, useContext, useEffect } from "react";

const AuthContext = React.createContext<{
	user: UserInfo | undefined;
	setUser: (user?: UserInfo) => void;
}>({ user: undefined, setUser: () => {} });

function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setStateUser] = React.useState<UserInfo>();

	useEffect(() => {
		const user = getUser();
		if (user.id_token) {
			setUser(user);
		}
	}, []);

	const setUser = useCallback((user?: UserInfo) => {
		setStateUser(user);
		if (user) {
			setCookieUser(user);
		} else {
			deleteUser();
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const auth = useContext(AuthContext);
	useEffect(() => {
		const interceptorId = axiosAuth.interceptors.request.use((config) => {
			if (auth.user) {
				config.headers.Authorization = `Bearer ${auth.user.id_token}`;
			}
			return config;
		});

		return () => {
			axiosAuth.interceptors.request.eject(interceptorId);
		};
	}, [auth]);

	return { ...auth, axiosAuth };
};

export default AuthProvider;

import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";
import { UserInfo } from "./types";
import { OptionsType } from "cookies-next/lib/types";

type UserInfoKey = keyof UserInfo;

export const userInfoKeys: UserInfoKey[] = [
	"userId",
	"doctorId",
	"hospitalId",
	"username",
	"id_token",
	"name",
	"authorities",
];

export const getUser = (ctx?: OptionsType) => {
	const user = {} as UserInfo;
	userInfoKeys.forEach((key) => {
		let storedValue = decodeURI(getCookie(key, ctx) as string);
		try {
			storedValue =
				storedValue === "undefined" ? undefined : JSON.parse(storedValue);
		} catch (error) {
			storedValue = storedValue;
		}
		if (storedValue) {
			user[key] = storedValue as never;
		}
	});
	return user as unknown as UserInfo;
};

export const setUser = (user: UserInfo) => {
	userInfoKeys.forEach((key) => {
		setCookie(key, user[key]);
	});
};

export const deleteUser = () => {
	userInfoKeys.forEach((key) => {
		deleteCookie(key);
	});
};

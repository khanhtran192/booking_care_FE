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
		user[key] = decodeURI(getCookie(key, ctx) as string) as never;
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

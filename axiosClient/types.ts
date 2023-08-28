import { AppPaginationProps } from "@/components/CardList/ListPagination";

export type Hospital = {
	id: number;
	name: string;
	address: string;
	email: string;
	phoneNumber: string;
	logo?: string;
	backgroundImage?: string;
	type: string;
	description: string;
	active: boolean;
};

export interface Department {
	id: number;
	departmentName: string;
	logo: string;
	description?: string;
	active?: boolean;
	hospital: Hospital;
}

export interface Doctor {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	dateOfBirth: string;
	degree: string;
	avatar: string;
	rate: number;
	star: number;
	specialize: string;
	department: Department;
	active: boolean;
}

export interface Pack {
	id: number;
	name: string;
	description: string;
	logo: string;
	price: string;
	hospital: Hospital;
	active: boolean;
}

export type TimeSlot = {
	id: number;
	time: string;
	startTime: {
		timeSLot: string;
		value: string;
		number: number;
	};
	endTime: {
		timeSLot: string;
		value: string;
		number: number;
	};
	description: string;
	price: number;
	active: boolean;
};

interface Sort {
	empty: boolean;
	unsorted: boolean;
	sorted: boolean;
}

interface Pageable {
	offset: number;
	sort: Sort;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	unpaged: boolean;
}

export interface ApiResponse<DataType> {
	totalPages: number;
	size: number;
	number: number;
	totalElements: number;
	content: DataType[];
	sort: Sort;
	pageable: Pageable;
}

export interface LoginInfo {
	username: string;
	password: string;
}

export interface RegisterInfo extends Omit<LoginInfo, "username"> {
	login: string;
	email: string;
	langKey: string;
	confirmPassword?: string;
}

export interface UserInfo {
	userId: number;
	doctorId: number;
	hospitalId: number;
	username: string;
	id_token: string;
	name?: string;
	authorities: string[];
}

export interface Customer {
	id: number;
	fullName: string;
	dateOfBirth: string;
	address: string;
	phoneNumber: string;
	email: string;
	gender: string;
}

export interface OrderInfo {
	id: number;
	address: string;
	symptom: string;
	date: string;
	status: string;
	price: number;
	timeSlot: TimeSlot;
	customer: Customer;
	doctor: Doctor;
	pack: Pack;
}

export interface Diagnose {
	id: number;
	description: string;
	order: OrderInfo;
}

export interface PaginationData<T>
	extends Pick<
		AppPaginationProps,
		"defaultCurrent" | "defaultPageSize" | "total"
	> {
	data: T[];
}

export type CMNDRes = {
	errorCode: number;
	errorMessage: string;
	data: {
		id: string;
		name: string;
		dob: string;
		sex: string;
		nationality: string;
		type_new: string;
		doe: string;
		home: string;
		address: string;
		address_entities: {
			province: string;
			district: string;
			ward: string;
			street: string;
		};
	}[];
};

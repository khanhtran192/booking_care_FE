export type Hospital = {
	id: number;
	name: string;
	address: string;
	email: string;
	phoneNumber: string;
	logo?: string;
	backgroundImage?: string;
	type: string;
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
}

export interface Pack {
	id: number;
	name: string;
	description: string;
	logo: string;
	price: string;
	hospital: Hospital;
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

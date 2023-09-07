export const HOSPITALS = "/hospitals";
export const DOCTORS = "/doctors";
export const PACKS = "/packs";
export const DEPARTMENTS = "/departments";
export const ORDERS = "/orders";
export const TIME_SLOTS = "/time-slots";
export const TIME_SLOT_VALUES = TIME_SLOTS + "/time-slot-values";

export const MANAGE_API = {
	DEPARTMENTS: `${HOSPITALS}/manage${DEPARTMENTS}`,
	DOCTORS: `${HOSPITALS}/manage${DOCTORS}`,
	PACKS: `${HOSPITALS}/manage${PACKS}`,
	TIME_SLOTS: `${HOSPITALS}/manage${PACKS}${TIME_SLOTS}`,
	DOCTOR_TIME_SLOTS: `${DOCTORS}${TIME_SLOTS}`,
};

import { faker } from "@faker-js/faker";

const selectRandom = <T>(arr: T[]) =>
	arr[faker.number.int({ min: 0, max: arr.length - 1 })];

function generateFakeTime() {
	const hours = faker.number.int({ min: 1, max: 12 });
	const minutes = ["00", "15", "30", "45"][
		faker.number.int({ min: 0, max: 3 })
	];
	const meridiem = faker.datatype.boolean() ? "a.m" : "p.m";
	return `${hours}:${minutes}${meridiem}`;
}

function generateHospital(id: number) {
	return {
		id,
		name: faker.company.name(),
		address: faker.location.streetAddress(),
		email: faker.internet.email(),
		phoneNumber: faker.phone.number(),
		logo: faker.internet.avatar(),
		backgroundImage: faker.image.url(),
		type: "BENH_VIEN",
	};
}

const hospitals = Array.from({ length: 40 }, (_, i) => generateHospital(i));

// Function to generate a fake department object
function generateDepartment(id: number) {
	return {
		id,
		departmentName: faker.company.name(),
		logo: faker.image.url(),
		description: faker.lorem.sentence(),
		active: true,
		hospital: selectRandom(hospitals),
	};
}

const departments = Array.from({ length: 20 }, (_, i) => generateDepartment(i));

// Function to generate a fake content object
function generateDoctor(id: number) {
	return {
		id,
		name: faker.person.fullName(),
		email: faker.internet.email(),
		phoneNumber: faker.phone.number(),
		degree: faker.person.jobTitle(),
		avatar: faker.image.avatar(),
		specialize: faker.lorem.paragraphs(3),
		department: selectRandom(departments),
	};
}
const doctors = Array.from({ length: 80 }, (_, i) => generateDoctor(i));

function generatePack(id: number) {
	return {
		id: 0,
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		logo: faker.image.url(),
		price: faker.commerce.price(),
		hospital: selectRandom(hospitals),
	};
}
const packs = Array.from({ length: 60 }, (_, i) => generatePack(i));

function generateTimeSlot(id: number) {
	const startTime = generateFakeTime();
	const endTime = generateFakeTime();
	return {
		id,
		time: `${startTime} - ${endTime}`,
		startTime: {
			timeSlot: faker.string.alpha(4),
			value: startTime,
			number: 0,
		},
		endTime: {
			timeSlot: faker.string.alpha(4),
			value: endTime,
			number: 0,
		},
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(),
		status: true,
		doctor: selectRandom(doctors),
		pack: selectRandom(packs),
	};
}

const timeSlots = Array.from({ length: 10 }, (_, i) => generateTimeSlot(i));

const users = [
	{
		userId: 0,
		doctorId: null,
		hospitalId: null,
		username: "admin",
		id_token: "FAKE_TOKEN",
		name: "Admin",
		authorities: ["ADMIN", "USER"],
	},
];

export { doctors, hospitals, departments, packs, timeSlots, users };

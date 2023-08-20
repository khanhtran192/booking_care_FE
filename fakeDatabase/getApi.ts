import { NextApiRequest } from "next";

export const getListApi = <T>(req: NextApiRequest, list: T[]) => {
	let { page = 0, size = 20, keyword } = req.query as Record<string, string>;
	size = +size;
	page = +page;
	const startIndex = page * size;
	const endIndex = startIndex + size;
	let filteredArray = list;

	if (keyword) {
		filteredArray = list.filter((item) => {
			for (const key in item) {
				if (Object.prototype.hasOwnProperty.call(item, key)) {
					const element = item[key];
					return (element + "").toLowerCase().includes(keyword?.toLowerCase());
				}
			}
			return false;
		});
	}
	const paginatedResults = filteredArray.slice(startIndex, endIndex);

	const totalPages = Math.ceil(filteredArray.length / size);
	const totalElements = filteredArray.length;

	return {
		content: paginatedResults,
		totalPages,
		totalElements,
		number: page,
		size,
	};
};

export const getId = <T>(list: T[], req: NextApiRequest) => {
	const id = +(req.query.id as string);
	return list[id];
};

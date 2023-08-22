import { Avatar } from "antd";

export const renderImage = (image: string) => {
	return (
		<Avatar
			src={image}
			size={30}
			className="border-2 border-solid border-blue-200 aspect-square shrink-0 object-cover object-center"
		/>
	);
};

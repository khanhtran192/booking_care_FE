import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, SpaceProps } from "antd";
import { useMemo } from "react";
import defaultAvatar from "./assets/defaultAvatar.jpg";
import { UploadImage } from "./components";
import { ImageValue } from "./types";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FormAvatarProps {
	value?: ImageValue;
	onChange?: (value?: ImageValue) => void;
	className?: string;
}

export const FormAvatar = ({ value, onChange, className }: FormAvatarProps) => {
	const calculateValue = useMemo(() => {
		if (!value) return defaultAvatar;
		if (typeof value === "object") return value.src;
		return value;
	}, [value]);

	return (
		<div
			className={cn(
				"group relative w-fit rounded-full overflow-hidden",
				className
			)}>
			<Image
				className="shadow-xl"
				width={300}
				height={300}
				src={calculateValue}
				alt="user avatar"
			/>
			<div className="absolute top-0 left-0 bottom-0 right-0 bg-white bg-opacity-60 invisible transition-all group-hover:visible flex items-center justify-center">
				<UploadImage onUpload={onChange}>
					<Button icon={<EditOutlined />} type="link" />
				</UploadImage>

				{value && (
					<Button
						danger
						onClick={() => onChange?.(undefined)}
						icon={<DeleteOutlined />}
						type="link"
					/>
				)}
			</div>
		</div>
	);
};

export const BgUpload = ({ value, className, onChange }: FormAvatarProps) => {
	const calculateValue = useMemo(() => {
		if (!value) return defaultAvatar;
		if (typeof value === "object") return value.src;
		return value;
	}, [value]);

	return (
		<div className={cn("group relative w-full overflow-hidden", className)}>
			<Image
				className="shadow-xl"
				width={1800}
				height={600}
				src={calculateValue}
				alt="user avatar"
			/>
			<div className="absolute bottom-4 right-4 border-gray-500 shadow rounded p-4 bg-white invisible transition-all group-hover:visible flex items-center justify-center">
				<UploadImage aspect={3} onUpload={onChange}>
					<Button icon={<EditOutlined />} type="link" />
				</UploadImage>

				{value && (
					<Button
						danger
						onClick={() => onChange?.(undefined)}
						icon={<DeleteOutlined />}
						type="link"
					/>
				)}
			</div>
		</div>
	);
};

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useMemo } from "react";
import { Container, ListAvatar, StyledAvatar } from "./FormAvatar.styles";
import defaultAvatar from "./assets/defaultAvatar.jpg";
import { UploadImage } from "./components";
import { ImageValue } from "./types";

interface FormAvatarProps {
	value?: ImageValue;
	onChange?: (value?: ImageValue) => void;
	showRemove?: boolean;
	onRemove?: () => void;
	onClick?: () => void;
	viewOnly?: boolean;
}

export const FormAvatar = ({
	value,
	onChange,
	viewOnly,
	showRemove = false,
	onRemove,
	onClick,
}: FormAvatarProps) => {
	const calculateValue = useMemo(() => {
		if (!value) return defaultAvatar;
		if (typeof value === "object") return value.src;
		return value;
	}, [value]);

	return (
		<Container>
			<StyledAvatar src={calculateValue} shape="square" onClick={onClick} />
			{viewOnly && (
				<ListAvatar>
					<UploadImage onUpload={onChange}>
						<Button icon={<EditOutlined />}></Button>
					</UploadImage>

					{showRemove && value && (
						<Button onClick={onRemove}>
							<DeleteOutlined />
						</Button>
					)}
				</ListAvatar>
			)}
		</Container>
	);
};

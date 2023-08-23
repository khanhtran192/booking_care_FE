import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useMemo, useState } from "react";
import { FormAvatar } from "./FormAvatar";
import { Container, ListAvatar, StyledAvatar } from "./FormAvatar.styles";
import { LightBox, UploadImage } from "./components";
import { ImageValue } from "./types";

interface FormAvatarListProps {
	value?: ImageValue[];
	onChange?: (values?: ImageValue[]) => void;
	viewOnly?: boolean;
}

export const FormAvatarList = ({
	value,
	onChange,
	viewOnly,
}: FormAvatarListProps) => {
	const [indexActive, setIndexActive] = useState(0);
	const [openLightBox, setOpenLightBox] = useState(false);

	const mainValue = useMemo(() => {
		if (value && value.length > 0) {
			return value[indexActive];
		}

		return undefined;
	}, [value, indexActive]);

	const avatarList = useMemo(() => {
		if (Array.isArray(value)) {
			return value?.map((item) => {
				if (typeof item === "object") return item.src;
				return item;
			});
		}
		return undefined;
	}, [value]);

	const handleChange = (newValue?: ImageValue) => {
		if (onChange && newValue) {
			onChange(
				value && value.length !== 0
					? value?.map((item, i) => {
							if (i === indexActive) return newValue;
							return item;
					  })
					: [newValue]
			);
		}
	};

	const handleRemove = () => {
		if (value && onChange) {
			onChange(value.filter((_, i) => i !== indexActive));
			if (indexActive !== 0 && indexActive === value.length - 1) {
				setIndexActive(value.length - 2);
			}
		}
	};

	const handleAdd = (objValue?: ImageValue) => {
		if (onChange && objValue) {
			if (value) {
				onChange([...value, objValue]);
				setIndexActive(value.length);
			} else {
				onChange([objValue]);
				setIndexActive(0);
			}
		}
	};

	return (
		<>
			<LightBox
				open={openLightBox}
				setOpen={setOpenLightBox}
				sources={avatarList}
				indexActive={indexActive}
			/>
			<Container className="avatar-list">
				<FormAvatar
					showRemove
					viewOnly={viewOnly}
					value={mainValue}
					onClick={() => setOpenLightBox(true)}
					onChange={handleChange}
					onRemove={handleRemove}
				/>
				<ListAvatar>
					{avatarList?.map((item, i) => {
						return (
							<StyledAvatar
								$isActive={indexActive === i}
								onClick={() => setIndexActive(i)}
								src={item}
								key={i}
								size={35}
								shape="square"
							/>
						);
					})}

					{!viewOnly && (
						<UploadImage onUpload={handleAdd}>
							<Button icon={<PlusOutlined style={{ fontSize: 12 }} />} />
						</UploadImage>
					)}
				</ListAvatar>
			</Container>
		</>
	);
};

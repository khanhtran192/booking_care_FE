import { App, Upload, UploadProps } from "antd";
import { ImageValue } from "../types";
import ImgCrop from "antd-img-crop";
import { RcFile } from "antd/es/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";

export const dummyRequest = ({ onSuccess }: UploadRequestOption) => {
	if (onSuccess) {
		onSuccess("ok");
	}
};

interface UploadImageProps extends UploadProps {
	onUpload?: (objValue?: ImageValue) => void;
}

export const UploadImage = ({
	children,
	onUpload,
	...rest
}: UploadImageProps) => {
	const { message } = App.useApp();

	const handleBeforeUpload = (file: RcFile) => {
		// Check size
		const isLt5M = file.size / 1024 / 1024 < 5;
		if (!isLt5M) {
			message.error("Dung lượng của ảnh không được lớn hơn 5mb");
			return false;
		}
		if (onUpload) {
			onUpload({ src: URL.createObjectURL(file), file });
		}
	};

	return (
		<ImgCrop rotationSlider>
			<Upload
				showUploadList={false}
				customRequest={dummyRequest}
				beforeUpload={handleBeforeUpload}
				accept="image/png, image/gif, image/jpeg">
				{children}
			</Upload>
		</ImgCrop>
	);
};

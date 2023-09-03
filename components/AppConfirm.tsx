import { Popconfirm, PopconfirmProps, message } from "antd";
import React from "react";

function AppConfirm({ title, onConfirm, ...props }: PopconfirmProps) {
	return (
		<Popconfirm
			title={title}
			description="Bạn có chắc chắn không?"
			okText="Có"
			cancelText="Không"
			onConfirm={async () => {
				try {
					await onConfirm?.();
					message.success(title + " thành công!");
				} catch (error) {
					console.log("error :", error);
					message.error(title + " thất bại!");
				}
			}}
			{...props}
		/>
	);
}

export default AppConfirm;

import React from 'react';
import LoginLayout from "@/components/layout/LoginLayout";
import { Button, Result } from "antd";
import Link from "next/link";
import { GetServerSideProps } from "next";
import axiosClient from "@/axiosClient";

type ConfirmProps = {
};

export const getServerSideProps: GetServerSideProps<ConfirmProps> = async ({query}) => {
	const response = await axiosClient.get("/activate", {
		params: {
			key: query.key
		}
	})

	return {
		props: {}
	}
}

const Confirm = (props: ConfirmProps) => {
	return (
			<LoginLayout>
				<Result className="mt-16" status="success" title="Xác thực email thành công!" subTitle="Bạn có thể đăng nhập và đặt lịch khám" extra={<Link href="/login"><Button>Đăng nhập</Button></Link>} />
			</LoginLayout>
	);
};

export default Confirm
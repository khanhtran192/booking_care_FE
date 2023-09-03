import { ReactNode, useEffect, useMemo } from "react";
import MainHeader from "@/components/layout/MainHeader";
import {
	BankOutlined,
	DashboardOutlined,
	FieldTimeOutlined,
	IdcardOutlined,
	InsertRowLeftOutlined,
	MedicineBoxOutlined,
	SolutionOutlined,
	UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/AuthProvider";
import { UserInfo } from "@/axiosClient/types";
import { getUser } from "@/axiosClient/userStore";
import { ROLE } from "@/global/constants";

const { Content, Sider } = Layout;

const getMenuItems = (user: UserInfo) => {
	const menuItems: MenuProps["items"] = [
		{
			key: "dashboard",
			label: "Dashboard",
			icon: <DashboardOutlined />,
		},
		{
			key: user?.hospitalId ? `hospitals/${user.hospitalId}/edit` : "info",
			label: user?.hospitalId ? "Thông tin bệnh viện" : "Thông tin cá nhân",
			icon: <IdcardOutlined />,
		},
		{
			key: "orders",
			label: "Đơn đặt khám",
			icon: <SolutionOutlined />,
		},
	];

	if (user.authorities.includes(ROLE.ADMIN)) {
		menuItems[3] = {
			key: "manage",
			type: "group",
			label: "Quản lý",
			children: [
				{
					key: "hospitals",
					label: "Bệnh viện",
					icon: <BankOutlined />,
				},
			],
		};
	}

	if (user.hospitalId) {
		menuItems[3] = {
			key: "manage",
			type: "group",
			label: "Quản lý",
			children: [
				{
					key: "departments",
					label: "Chuyên khoa",
					icon: <InsertRowLeftOutlined />,
				},
				{
					key: "doctors",
					label: "Bác sỹ",
					icon: <UserOutlined />,
				},
				{
					key: "packs",
					label: "Gói khám",
					icon: <MedicineBoxOutlined />,
				},
				{
					key: "request-orders",
					label: "Yêu cầu khám bệnh",
					icon: <SolutionOutlined />,
				},
			],
		};
	}

	if (user.authorities.includes(ROLE.DOCTOR)) {
		menuItems[3] = {
			key: "manage",
			type: "group",
			label: "Quản lý",
			children: [
				{
					key: "time-slots",
					label: "Ca khám",
					icon: <FieldTimeOutlined />,
				},
				{
					key: "request-orders",
					label: "Yêu cầu khám bệnh",
					icon: <SolutionOutlined />,
				},
			],
		};
	}

	return menuItems;
};

type AdminLayoutProps = {
	children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const router = useRouter();
	const { user } = useAuth();
	const defaultSelectedKeys = useMemo(() => {
		const currentPath = router.asPath
			.split("/")
			.slice(2)
			.join("/")
			.replace(/\?.+$/, "");
		return [currentPath || "dashboard"];
	}, [router.asPath]);

	useEffect(() => {
		if (!getUser().id_token) {
			router.replace("/login", {
				query: {},
			});
		}
	}, [router, user]);

	const menuItems = useMemo(() => {
		if (!user) return [];
		return getMenuItems(user);
	}, [user]);

	return (
		<Layout className="h-screen">
			<MainHeader />
			<Layout className="h-full mt-[4.5rem]">
				<Sider collapsible style={{ background: colorBgContainer }}>
					<Menu
						mode="inline"
						defaultSelectedKeys={defaultSelectedKeys}
						className={"pt-6 h-full border-r-0"}
						items={menuItems}
						onSelect={({ key }) => {
							router.push(`/manage/${key}`);
						}}
					/>
				</Sider>
				<Layout className="p-6">
					<Content
						className="overflow-auto m-0 p-6"
						style={{
							background: colorBgContainer,
						}}>
						{children}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;

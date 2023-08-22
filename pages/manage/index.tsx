import React from "react";
import {
	BankOutlined,
	DeleteOutlined,
	EditOutlined,
	IdcardOutlined,
	InsertRowLeftOutlined,
	MedicineBoxOutlined,
	PlusOutlined,
	UserOutlined,
} from "@ant-design/icons";
import type { MenuProps, TableColumnsType } from "antd";
import { Button, Layout, Menu, Table, Tag, theme, } from "antd";
import MainHeader from "@/components/layout/MainHeader";

const { Header, Content, Sider } = Layout;

const menuItems: MenuProps["items"] = [
	{
		key: "info",
		label: "Thông tin cá nhân",
		icon: <IdcardOutlined />
	}, {
	key: "manage",
	type: "group",
	label: "Quản lý",
	children: [
		{
			key: "hospitals",
			label: "Bệnh viện",
			icon: <BankOutlined/>
		}, {
			key: "departments",
			label: "Chuyên khoa",
			icon: <InsertRowLeftOutlined/>
		}, {
			key: "doctors",
			label: "Bác sĩ",
			icon: <UserOutlined/>
		},
		{
			key: "packs",
			label: "Gói khám",
			icon: <MedicineBoxOutlined/>
		}
	],
},
];

interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
}

const columns: TableColumnsType<DataType> = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Age",
		dataIndex: "age",
		key: "age",
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Tags",
		key: "tags",
		dataIndex: "tags",
		render: (_, { tags }) => (
				<>
					{tags.map((tag) => {
						let color = tag.length > 5 ? "geekblue" : "green";
						if (tag === "loser") {
							color = "volcano";
						}
						return (
								<Tag color={color} key={tag}>
									{tag.toUpperCase()}
								</Tag>
						);
					})}
				</>
		),
	},
	{
		width: 100,
		key: "action",
		render: (_, record) => (
				<>
					<Button icon={<EditOutlined/>} type="link"/>
					<Button icon={<DeleteOutlined/>} danger type="link"/>
				</>
		),
	},
];

const data = [
	{
		key: "1",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		tags: ["loser"],
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sydney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
];

const App: React.FC = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
			<Layout className="h-screen">
				<MainHeader/>
				<Layout className="h-full mt-[4.5rem]">
					<Sider collapsible width={200} style={{ background: colorBgContainer }}>
						<Menu
								mode="inline"
								defaultSelectedKeys={["info"]}
								className={"h-full border-r-0"}
								items={menuItems}
						/>
					</Sider>
					<Layout style={{ padding: "0 24px 24px" }}>
						<Content
								style={{
									padding: 24,
									margin: 0,
									minHeight: 280,
									background: colorBgContainer,
								}}>
							<Button icon={<PlusOutlined/>} type="primary">
								Create
							</Button>
							<Table columns={columns} dataSource={data}/>
						</Content>
					</Layout>
				</Layout>
			</Layout>
	);
};

export default App;

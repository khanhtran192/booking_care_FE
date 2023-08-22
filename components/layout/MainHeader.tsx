import { useAuth } from "@/lib/AuthProvider";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Dropdown, MenuProps, Typography } from "antd";
import Link from "next/link";
import Logo from "../Logo";
import AppContainer from "./AppContainer";

const items: MenuProps["items"] = [
	{
		label: <Link href="/manage/info">Cập nhật thông tin</Link>,
		key: "0",
	},
	{
		label: <Link href="/manage/dashboard">Quản lý</Link>,
		key: "1",
	},
	{
		type: "divider",
	},
	{
		label: "Đăng xuất",
		danger: true,
		key: "3",
	},
];

function MainHeader() {
	const { user, setUser } = useAuth();
	return (
		<div className="fixed w-full h-[4.5rem] top-0 left-0 bg-white z-50 shadow-md">
			<AppContainer className="flex justify-between h-full items-center py-3">
				<Link href="/" className="flex gap-2">
					<Logo />
					<h3 className="text-blue-400">BookingCare</h3>
				</Link>
				<ul className="flex gap-2">
					<li>
						<Link className="font-semibold py-2 px-3" href="/hospitals">
							Cơ sở y tế
						</Link>
					</li>
					<li>
						<Link className="font-semibold py-2 px-3" href="/doctors">
							Bác sỹ
						</Link>
					</li>
					<li>
						<Link className="font-semibold py-2 px-3" href="/packages">
							Gói khám
						</Link>
					</li>
				</ul>

				<div className="flex items-center gap-2">
					{user ? (
						<>
							<Avatar
								className="bg-purple-300 flex items-center justify-center"
								size={40}
								src={<UserOutlined />}
							/>
							<Dropdown
								menu={{
									items,
									onSelect: ({ key }) => {
										if (key === "3") {
											setUser();
										}
									},
								}}
								trigger={["click"]}>
								<Typography.Link>
									<div className="flex items-center gap-1">
										{user.name ?? "Unknown User"}
										<DownOutlined />
									</div>
								</Typography.Link>
							</Dropdown>
						</>
					) : (
						<>
							<Link href="/login">
								<Button className="p-0" type="link">
									Đăng nhập
								</Button>
							</Link>
							<Divider className="border-gray-300" type="vertical" />
							<Link href="/register">
								<Button className="p-0" type="link">
									Đăng ký
								</Button>
							</Link>
						</>
					)}
				</div>
			</AppContainer>
		</div>
	);
}

export default MainHeader;

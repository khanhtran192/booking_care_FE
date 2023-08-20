import { Button, Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import AppContainer from "./AppContainer";

function MainHeader() {
	return (
		<div className="fixed w-full h-[4.5rem] top-0 left-0 bg-white z-50 shadow-md">
			<AppContainer className="flex justify-between h-full items-center py-3">
				<Link href="/" className="flex gap-2">
					<Image src="logo.svg" alt="logo" width={20} height={20} />
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
				<div>
					<Link href="login">
						<Button className="p-0" type="link">
							Đăng nhập
						</Button>
					</Link>
					<Divider className="border-gray-300" type="vertical" />
					<Link href="register">
						<Button className="p-0" type="link">
							Đăng ký
						</Button>
					</Link>
				</div>
			</AppContainer>
		</div>
	);
}

export default MainHeader;

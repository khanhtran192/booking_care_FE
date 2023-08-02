import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
	children: React.ReactNode;
};

function Layout({ children }: Props) {
	return (
		<>
			<div className="fixed w-full left-0 shadow-md">
				<div className="mx-auto lg:max-w-6xl container flex justify-between h-max items-center py-3">
					<div className="flex gap-2">
						<Image src="logo.svg" alt="logo" width={20} height={20} />
						<h3 className="text-blue-400">BookingCare</h3>
					</div>
					<ul className="flex gap-2">
						<li>
							<Link className="font-semibold py-2 px-3" href="">
								Chuyên khoa
							</Link>
						</li>
						<li>
							<Link className="font-semibold py-2 px-3" href="">
								Cơ sở y tế
							</Link>
						</li>
						<li>
							<Link className="font-semibold py-2 px-3" href="">
								Bác sỹ
							</Link>
						</li>
						<li>
							<Link className="font-semibold py-2 px-3" href="">
								Gói khám
							</Link>
						</li>
					</ul>
					<div>
						<div className="flex w-full justify-end gap-2">
							<Image src="question.svg" alt="help" width={16} height={16} />
							<p className="text-blue-400">Hỗ trợ</p>
						</div>
						<a className="text-blue-400" href="tel:+012-345-6789">
							012-345-6789
						</a>
					</div>
				</div>
			</div>

			<div className="my-[4.5rem]">{children}</div>
			<div className="w-full h-16 fixed bottom-0 left-0 bg-blue-400 flex items-center">
				<div className="container mx-auto lg:max-w-6xl text-white">
					© 2023 BookingCare
				</div>
			</div>
		</>
	);
}

export default Layout;

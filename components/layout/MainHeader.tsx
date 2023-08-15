import React from "react";
import AppContainer from "./AppContainer";
import Image from "next/image";
import Link from "next/link";

function MainHeader() {
	return (
		<div className="fixed w-full top-0 left-0 bg-white z-50 shadow-md">
			<AppContainer className="flex justify-between h-max items-center py-3">
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
					<div className="flex w-full justify-end gap-2">
						<Image src="question.svg" alt="help" width={16} height={16} />
						<p className="text-blue-400">Hỗ trợ</p>
					</div>
					<a className="text-blue-400" href="tel:+012-345-6789">
						012-345-6789
					</a>
				</div>
			</AppContainer>
		</div>
	);
}

export default MainHeader;

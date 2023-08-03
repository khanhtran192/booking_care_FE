import Image from "next/image";
import React from "react";

type CardProps = {
	image: string;
	small?: boolean;
	title: string;
};

function Card({ small, image, title }: CardProps) {
	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<a href="#">
				<Image
					className="rounded-t-lg"
					src={image}
					width={278 * 2}
					height={156 * 2}
					alt=""
				/>
			</a>
			<div className={small ? "pt-3 pl-3" : "p-5"}>
				<a href="#">
					<h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
						{title}
					</h5>
				</a>
				{!small && (
					<>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							Mô hình "Nền tảng như một dịch vụ" bao gồm Website, ứng dụng di
							động và phần mềm quản trị, tích hợp 3 trong 1 nền tảng tiện ích dễ
							dùng
						</p>
						<a
							href="#"
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-500  focus:outline-none ">
							Xem chi tiết
							<svg
								className="w-3.5 h-3.5 ml-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10">
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</a>
					</>
				)}
			</div>
		</div>
	);
}

export default Card;

import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

export type CardProps = {
	image: string;
	small?: boolean;
	title: string;
	content?: string;
	href?: string;
};

function AppCard({ small, image, title, content, href = "#" }: CardProps) {
	return (
		<Card>
			<Link href={href}>
				<Image
					className="rounded-t-lg"
					src={image}
					width={278 * 2}
					height={156 * 2}
					alt=""
				/>
			</Link>
			<CardContent>
				<Link href={href}>
					<h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
						{title}
					</h5>
				</Link>
				{content && (
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{content}
					</p>
				)}
				{!small && (
					<Link
						href={href}
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
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</Link>
				)}
			</CardContent>
		</Card>
	);
}

export default AppCard;

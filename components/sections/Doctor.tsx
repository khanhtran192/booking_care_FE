import Image from "next/image";
import Link from "next/link";
import React from "react";

export type DoctorProps = {
	id: string | number;
	name: string;
	avatar?: string;
	department?: string;
	href?: string;
};

type Props = {
	doctors: any[];
};

function Doctor({ doctors }: Props) {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
				<div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
						Đội ngũ bác sỹ
					</h2>
					<p className="font-light text-gray-500 sm:text-xl dark:text-gray-400"></p>
				</div>
				<div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{doctors?.map(({ id, ...doctor }) => {
						return (
							<div
								key={id}
								className="text-center text-gray-500 dark:text-gray-400">
								<Link href={`doctors/${id}`}>
									<Image
										className="mx-auto mb-4 w-36 h-36 rounded-full"
										width={144}
										height={144}
										src={
											doctor.avatar ||
											"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1bCW97HV3Pdoboi7QnR8_8_KTCl28yyE6Q&usqp=CAU"
										}
										alt="Avatar"
									/>
								</Link>
								<h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									<Link href={`doctors/${id}`}>{doctor.name}</Link>
								</h3>
								<p>{doctor.department}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default Doctor;

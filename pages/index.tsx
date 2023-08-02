import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<div>
			<div className="container bg-gradient-to-br flex">
				<button className="rounded-full bg-white px-3 py-2 text-xs">
					<span className="rounded-full px-2 py-1 bg-purple-500 text-white">
						CAREBLOG
					</span>
					Tin tức được featured
				</button>
				<Image src="mainBg.svg" alt="" width={300} height={300} />
			</div>
		</div>
	);
}

import React from "react";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	return (
		<>
			<Component {...pageProps} />
			<Footer />
			<div className="w-full h-16 bg-blue-400 flex items-center">
				<div className="container mx-auto lg:max-w-6xl text-white">
					© 2023 BookingCare
				</div>
			</div>
		</>
	);
}

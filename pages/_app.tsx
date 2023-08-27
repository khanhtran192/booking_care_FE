import React from "react";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import AuthProvider from "@/lib/AuthProvider";
import { App as AntApp } from "antd";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	return (
		<AntApp>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</AntApp>
	);
}

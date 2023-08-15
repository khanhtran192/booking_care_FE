import React from "react";
import MainHeader from "./MainHeader";
import Footer from "./Footer";
import AppContainer from "./AppContainer";
import { Input } from "../ui/input";
import Logo from "../Logo";
import Link from "next/link";

type Props = {
	children?: React.ReactNode;
	title?: string;
};

function ListLayout({ children, title }: Props) {
	return <>{children}</>;
}

export default ListLayout;

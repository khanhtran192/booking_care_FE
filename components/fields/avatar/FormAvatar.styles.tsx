import React, { ReactNode } from "react";
import { Space, Avatar, SpaceProps, AvatarProps } from "antd";
import { cn } from "@/lib/utils";

interface ContainerProps {
	children: ReactNode;
	className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
	<div
		className={cn("p-[10px] w-full max-w-[300px] shadow rounded", className)}>
		{children}
	</div>
);

const ListAvatar: React.FC<SpaceProps> = (props) => (
	<Space className="cursor-pointer flex-wrap mt-[5%]" {...props} />
);

interface StyledAvatarProps extends AvatarProps {
	$isActive: boolean;
}

const StyledAvatar: React.FC<StyledAvatarProps> = ({ $isActive, children }) => (
	<Avatar className={`${!$isActive ? "opacity-50" : ""}`}>{children}</Avatar>
);

export { Container, ListAvatar, StyledAvatar };

import React from "react";

import { cn } from "@/lib/utils";

const AppContainer = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("container lg:max-w-6xl mx-auto", className)} {...props} />
);

export default AppContainer;

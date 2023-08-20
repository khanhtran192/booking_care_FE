import { cn } from "@/lib/utils";
import React from "react";

function AppGrid({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("grid grid-cols-4 gap-4", className)} {...props} />;
}

export default AppGrid;

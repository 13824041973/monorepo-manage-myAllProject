import React from "react";

type Props = {
	className?: string;
	children: React.ReactNode;
};

export default function Card({ className, children }: Props) {
	return (
		<div
			className={`bg-white border border-slate-200 m-2 rounded-sm shadow-md ${className}`}
		>
			{children}
		</div>
	);
}

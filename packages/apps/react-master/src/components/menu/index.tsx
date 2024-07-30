import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ZHRouter } from "../../router/index";

type Props = {
	navs?: Array<ZHRouter>;
};

export default function Menu({ navs }: Props) {
	const navigation = useLocation();

	const getParentPath = () => {
		let pathRes;
		navs?.forEach((item) => {
			(item.children || []).forEach((subItem) => {
				if (
					subItem.path &&
					navigation.pathname.includes(subItem.path)
				) {
					pathRes = item.path;
				}
			});
		});
		return pathRes;
	};

	return (
		<div>
			{navs?.map((item) => (
				<NavLink
					key={item.path}
					to={item.path || ""}
					className={({ isActive }) =>
						"hover:text-black mx-4 h-full py-3 transition-all " +
						(isActive || getParentPath() === item.path
							? "font-extrabold text-black border-b-4 border-blue-600"
							: "text-slate-500")
					}
				>
					{item.title}
				</NavLink>
			))}
		</div>
	);
}

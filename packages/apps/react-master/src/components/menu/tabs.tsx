import React from "react";
import { NavLink } from "react-router-dom";
import { ZHRouter } from "../../router";

type Props = { navs: Array<ZHRouter> };

const Tabs = ({ navs }: Props) => (
	<div className="flex">
		{navs?.map((item) => (
			<NavLink
				key={item.title}
				to={item.path || "/"}
				className={({ isActive }) =>
					" whitespace-nowrap p-4 px-6 text-base transition-all " +
					(isActive
						? "text-blue-500 font-semibold"
						: "text-black hover:text-blue-900")
				}
			>
				{item.title}
			</NavLink>
		))}
	</div>
);

export default Tabs;

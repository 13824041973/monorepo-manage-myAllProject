import React from "react";
import { Outlet } from "react-router-dom";
import Tabs from "../../../components/menu/tabs";
import { ZHRouter } from "../../../router";

type Props = {
	navs: Array<ZHRouter>;
};

export default function Content({ navs }: Props) {
	return (
		<div className="w-full">
			<div className="flex">
				<Tabs navs={navs} />
			</div>
			<Outlet />
		</div>
	);
}

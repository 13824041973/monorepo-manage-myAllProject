import React from "react";
import { Outlet } from "react-router-dom";
import Card from "../../components/card";
import Navigation from "../../components/navigation";
import Creation from "./creation";

type Props = {};

export default function Home({}: Props) {
	return (
		<div className="bg-slate-100">
			<Navigation />
			<div className="mx-auto max-w-6xl flex my-2 px-2">
				<Card className="w-5/7">Tabs</Card>
				<div className="w-2/7 flex flex-col flex-1">
					<Card className="w-full">
						<Creation />
					</Card>
					<Card className="w-full">创作中心</Card>
					<Card className="w-full">创作中心</Card>
				</div>
			</div>
			<Outlet />
		</div>
	);
}

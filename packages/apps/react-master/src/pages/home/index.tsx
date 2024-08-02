import React, { useMemo } from "react";
import Card from "../../components/card";
import Navigation from "../../components/navigation";
import { router } from "../../router";
import AdvancedBtns from "./advancedBtns";
import Content from "./content";
import Creation from "./creation";
import SelfFunctions from "./selfFuns";

type Props = {};

export default function Home({}: Props) {
	const navs = useMemo(
		() =>
			router.find((item) => item.title === "首页" && item.path === "/")
				?.children || [],
		[router],
	);

	return (
		<div className="bg-slate-100">
			<Navigation />
			<div className="mx-auto max-w-6xl flex my-2 px-2">
				<Card className="w-5/7">
					<Content navs={navs} />
				</Card>
				<div className="w-2/7 flex flex-col flex-1">
					<Card className="w-full">
						<Creation />
					</Card>
					<Card className="w-full">
						<AdvancedBtns />
					</Card>
					<Card className="w-full">
						<SelfFunctions />
					</Card>
				</div>
			</div>
		</div>
	);
}

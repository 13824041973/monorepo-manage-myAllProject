import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "../pages/home";

interface LuyolGRouteObj {
	title?: string;
	children?: Array<ZHRouter>;
}

export type ZHRouter = RouteObject & LuyolGRouteObj;

export const router: Array<ZHRouter> = [
	{
		path: "/",
		element: <Home />,
		title: "首页",
		children: [
			{ path: "/", element: <div>推荐</div>, title: "推荐" },
			{ path: "/follow", element: <div>关注</div>, title: "关注" },
			{ path: "/hot", element: <div>热榜</div>, title: "热榜" },
			{ path: "/zvideo", element: <div>视频</div>, title: "视频" },
		],
	},
	{
		path: "/education",
		element: <div>知乎知学堂</div>,
		title: "知乎知学堂",
	},
	{
		path: "/question/waiting",
		element: <div>等你来答</div>,
		title: "等你来答",
	},
	{
		path: "/explore",
		element: <div>发现</div>,
		title: "发现",
	},
];

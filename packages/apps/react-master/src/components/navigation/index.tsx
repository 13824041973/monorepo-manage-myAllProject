import React from "react";
import { router } from "../../router";
import Logo from "../logo";
import Menu from "../menu";
import Search from "../search";

type Props = {};

const MenuAlarm = () => (
	<div className="flex mr-10 gap-6">
		<div className="flex flex-col justify-center items-center">
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				className="text-slate-500"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M9.723 21.271c0-.42.34-.76.76-.76h3.043a.76.76 0 0 1 0 1.521h-3.043a.76.76 0 0 1-.76-.76Z"
					clipRule="evenodd"
				></path>
				<path d="M11.153 3.115c0-.618.376-1.115.844-1.115.469 0 .845.499.845 1.115v.183c3.997.369 7.012 4.117 7.024 8.515V17.468h.253a.76.76 0 1 1 0 1.521H3.891a.76.76 0 0 1 0-1.521h.253V11.813c.011-4.392 3.02-8.137 7.009-8.514v-.184Z"></path>
			</svg>
			<span className="text-slate-500 text-xs">消息</span>
		</div>
		<div className="flex flex-col justify-center items-center">
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				className="text-slate-500"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M2 11c0 1.79.553 3.45 1.498 4.82L2.6 18.667a.6.6 0 0 0 .751.753l3.07-.96A8.5 8.5 0 1 0 2 11Zm11.46 9.414c-.457.16-.506.794-.034.904A6.96 6.96 0 0 0 15 21.5c1.148 0 2.422-.31 3.444-.912.357-.217.658-.378 1.043-.252l1.414.42c.357.112.679-.168.574-.546l-.47-1.57a.736.736 0 0 1 .05-.632c.602-1.108.945-2.32.945-3.498 0-1.07-.248-2.11-.7-3.046-.21-.435-.815-.25-.872.23-.47 3.954-3.211 7.394-6.968 8.72Z"
					clipRule="evenodd"
				></path>
			</svg>
			<span className="text-slate-500 text-xs">私信</span>
		</div>
		<div className="flex justify-center items-center">
			<img
				className="w-7 h-7"
				src="https://pica.zhimg.com/v2-1d4475082654e2c8d3988a38e4088eae_l.jpg?source=32738c0c"
			/>
		</div>
	</div>
);

export default function Navigation({}: Props) {
	return (
		<div className="bg-white shadow h-13">
			<div className="max-w-7xl min-w-6xl mx-auto my-0 flex justify-center h-full">
				<div className="w-full flex justify-between items-center min-w-max">
					<div className="flex items-center">
						<Logo />
						<Menu navs={router} />
					</div>
					<Search />
					<MenuAlarm />
				</div>
			</div>
		</div>
	);
}

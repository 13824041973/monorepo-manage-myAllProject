import React, { Fragment } from "react";

type Props = {};

export default function Search({}: Props) {
	return (
		<Fragment>
			<div className="flex items-center">
				<input className="w-96 h-8 border border-slate-200 px-4 rounded-full bg-slate-50" />
				<button className="w-16 h-8 text-sm mx-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 duration-300 transition-all">
					提问
				</button>
			</div>
		</Fragment>
	);
}

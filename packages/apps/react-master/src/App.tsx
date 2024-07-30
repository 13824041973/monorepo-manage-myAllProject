import React from "react";
import { HashRouter, useRoutes } from "react-router-dom";
// import styles from "./app.module.less";
// import styles2 from "./app.module.css";

import { router } from "./router";

const Routers = () => useRoutes(router);

export default function App() {
	return (
		// <>
		// 	<div className="title">Hello world</div>
		// 	<div className="title2 title">title2</div>
		// 	<div className={styles.title}>module less</div>
		// 	<div className={styles2.title2}>module css</div>
		// 	<div className="bg-blue-400">tailwindcss</div>
		// </>

		<>
			<HashRouter>
				<Routers />
			</HashRouter>
		</>
	);
}

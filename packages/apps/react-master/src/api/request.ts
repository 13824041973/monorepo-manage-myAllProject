import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
	(config) => {
		config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx5bCIsImlhdCI6MTcyNTU1NjI5MCwiZXhwIjoxNzI1NTU5ODkwfQ.RpeRKRaa4Cco__eJrPxONEw01VdRrSc7Pd9iWoA7UNk";
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

instance.interceptors.response.use((res) => res.data);

const COMMON_URL = `http://localhost:3010/api`;

export interface FeedOpts {
	url: string;
	startNum: number;
	pageSize: number;
}

export const apiGet = (opts: FeedOpts) => {
	return instance<any, any>({
		method: "get",
		url: `${COMMON_URL}${opts.url}?startNum=${opts.startNum}&pageSize=${opts.pageSize}`,
	});
};

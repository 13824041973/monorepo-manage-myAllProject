import axios from "axios";

const instance = axios.create();

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

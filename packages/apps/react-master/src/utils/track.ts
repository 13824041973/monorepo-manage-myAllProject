import { AsyncTrackQueue } from "./async-track-queue";

interface TrackData {
	seqId: number;
	id: string;
	timestamp: number;
	msg?: string;
	eventName?: string;
}

export interface UserTrackData {
	msg?: string;
	eventName?: string;
}

export class BaseTrack extends AsyncTrackQueue<TrackData> {
	private seq = 0;

	// 对于一些曝光等点位，一次性可能上报太多了，我们可以收集一波，截流一下，再上报~
	public track(data: UserTrackData) {
		this.addTask({
			id: `${Math.random()}`,
			seqId: this.seq++,
			timestamp: Date.now(),
			...data,
		});
	}

	protected consumeTaskQueue(data: Array<TrackData>): Promise<unknown> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(data.map((item) => item.msg));
			});
		}).then(console.log);
	}
}

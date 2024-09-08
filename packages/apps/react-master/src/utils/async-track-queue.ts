import { debounce } from "lodash";

interface RequireData {
	timestamp?: number | string;
}

/**
 * 如果我还没有上报，queueData 还有数据，但是用户关闭的浏览器
 * 所以，我要用 localStorage 去存储这些没有用的数据
 * 等我下次再打开浏览器的时候，我再追加上报
 */
class TaskQueueStorableHelper<T extends RequireData> {
	private static instance: TaskQueueStorableHelper<any> | null = null;
	public static getInstance<T extends RequireData>() {
		if (!this.instance) {
			this.instance = new TaskQueueStorableHelper<T>();
		}
		return this.instance;
	}

	private STORAGE_KEY = "lyl_local_store";
	private store: any = null;

	// 我再次打开浏览器的时候，就是 constructor 的执行时机
	// 如果我的 STORAGE_KET 还有内容，就说明还没上报完，我再上报一下~
	constructor() {
		const localStorageVal = localStorage.getItem(this.STORAGE_KEY);
		if (localStorageVal) {
			try {
				this.store = JSON.parse(localStorageVal);
			} catch (error) {}
		}
	}

	get queueData() {
		return this.store?.queueData || null;
	}

	set queueData(queueData: Array<T>) {
		this.store = {
			...this.store,
			queueData: queueData.sort(
				(a, b) => Number(a.timestamp) - Number(b.timestamp),
			),
		};
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store));
	}
}

export abstract class AsyncTrackQueue<T> {
	private get storableService() {
		return TaskQueueStorableHelper.getInstance();
	}

	private get queueData(): Array<T> {
		return this.storableService.queueData || [];
	}
	private set queueData(value: Array<T>) {
		this.storableService.queueData = value;
		if (value.length) {
			// 开始提交数据
			this.debounceRun();
		}
	}

	public addTask(data: T | Array<T>) {
		this.queueData = (this.queueData || []).concat(data);
	}

	protected debounceRun = debounce(this.run.bind(this), 500);

	private run() {
		const currentDataList = this.queueData;
		if (currentDataList.length) {
			this.queueData = [];
			this.consumeTaskQueue(currentDataList);
		}
	}

	protected abstract consumeTaskQueue(data: Array<T>): Promise<unknown>;
}

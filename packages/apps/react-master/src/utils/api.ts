import { BaseTrack } from "./track";

const t = new BaseTrack();

export class Performance {
	public static readonly timing = window.performance.timing;

	public static init() {
		if (this.timing) {
			window.addEventListener("load", () => {
				t.track({
					eventName: "PAGE_LOAD",
					msg: `dns: ${this.getTimings().tcp}`,
				});
			});
		}
	}

	public static getTimings(): { [key in string]: number } {
		return {
			dns:
				Performance.timing.connectEnd - Performance.timing.connectStart,
			tcp:
				Performance.timing.domainLookupEnd -
				Performance.timing.domainLookupStart,
		};
	}
}

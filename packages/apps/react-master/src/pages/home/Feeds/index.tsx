import React, {
	FC,
	MouseEventHandler,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { apiGet } from "../../../api/request";

interface ItemProps {
	item: any;
}

const RecommendData: FC<ItemProps> = ({ item }) => {
	const [selected, setSelected] = useState<boolean>(false);

	const href = useMemo<string>(
		() =>
			`https://www.zhihu.com/question/${item?.target?.question?.id}/answer/${item?.target?.id}`,
		[item],
	);

	const handleClick: MouseEventHandler<Element> = useCallback<
		MouseEventHandler<Element>
	>((e) => {
		e.preventDefault();
		setSelected((val) => !val);
	}, []);

	return (
		<div className="flex flex-col items-start p-4 border-b">
			{/* 标题 */}
			<div className="h-auto flex justify-start">
				<a
					href={href}
					className="font-semibold text-black text-lg leading-10"
					target="_blank"
				>
					{item?.target?.question?.title}
				</a>
			</div>
			{/* 文章内容 */}
			<div onClick={handleClick} className="text-black">
				{selected ? (
					<div className="w-full flex flex-col justify-start">
						<div className="flex flex-row m-2">
							<img
								src={item?.target?.author?.avatar_url}
								className="w-10 h-10"
							/>
							<div className="ml-2 text-sm font-semibold ">
								{item?.target?.author?.name}
							</div>
						</div>
						<div
							dangerouslySetInnerHTML={{
								__html: item?.target?.content,
							}}
						/>
					</div>
				) : (
					<a href="/">
						{item?.target?.excerpt_new || item?.target?.excerpt}
						<span className="text-sm leading-7 text-blue-500 hover:text-slate-500">
							阅读全文 &gt;
						</span>
					</a>
				)}
			</div>
			{/* 底bar */}
			<div
				className={`flex bg-white w-full ${selected ? "bottom-0 border-t sticky shadow-sm " : ""}`}
			>
				<div className="h-10 w-24 flex justify-center rounded-sm bg-blue-100 text-blue-500 px-2 py-1 m-2 ">
					<span className="inline-flex items-center justify-center">
						<svg
							width="10"
							height="10"
							viewBox="0 0 24 24"
							className="Zi Zi--TriangleUp VoteButton-TriangleUp"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M13.792 3.681c-.781-1.406-2.803-1.406-3.584 0l-7.79 14.023c-.76 1.367.228 3.046 1.791 3.046h15.582c1.563 0 2.55-1.68 1.791-3.046l-7.79-14.023Z"
								clipRule="evenodd"
							></path>
						</svg>
						&nbsp;赞同
					</span>
				</div>
				<div className="h-10 w-8 justify-center rounded-sm bg-blue-100 text-blue-500 px-2 py-1 m-2 inline-flex">
					<span className="inline-flex items-center justify-center">
						<svg
							width="10"
							height="10"
							viewBox="0 0 24 24"
							className="Zi Zi--TriangleDown"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M13.792 20.319c-.781 1.406-2.803 1.406-3.584 0L2.418 6.296c-.76-1.367.228-3.046 1.791-3.046h15.582c1.563 0 2.55 1.68 1.791 3.046l-7.79 14.023Z"
								clipRule="evenodd"
							></path>
						</svg>
					</span>
				</div>
				<div className="font-base text-gray-400 p-2 m-2 inline-flex">
					<svg
						width="1.2em"
						height="1.2em"
						viewBox="0 -2 24 24"
						data-new-api="ChatBubbleFill24"
						data-old-api="Comment"
						className="Zi Zi--Comment Button-zi"
						fill="currentColor"
					>
						<path
							d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					&nbsp; {item?.target?.comment_count} 条评论
				</div>
				<div className="font-base text-gray-400 p-2 m-2 inline-flex">
					<svg
						width="1.2em"
						height="1.2em"
						viewBox="0 -2 24 24"
						data-new-api="ChatBubbleFill24"
						data-old-api="Comment"
						className="Zi Zi--Comment Button-zi"
						fill="currentColor"
					>
						<path
							d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					收藏
				</div>
				<div className="font-base text-gray-400 p-2 m-2 inline-flex">
					<svg
						width="1.2em"
						height="1.2em"
						viewBox="0 -2 24 24"
						data-new-api="ChatBubbleFill24"
						data-old-api="Comment"
						className="Zi Zi--Comment Button-zi"
						fill="currentColor"
					>
						<path
							d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					喜欢
				</div>
				<div className="font-base text-gray-400 p-2 m-2 inline-flex">
					<svg
						width="1.2em"
						height="1.2em"
						viewBox="0 -2 24 24"
						data-new-api="ChatBubbleFill24"
						data-old-api="Comment"
						className="Zi Zi--Comment Button-zi"
						fill="currentColor"
					>
						<path
							d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					分享
				</div>
				{selected && (
					<div
						onClick={handleClick}
						className="text-base text-gray-400 p-2 m-2 inline-flex cursor-pointer"
					>
						收起
					</div>
				)}
			</div>
		</div>
	);
};

// effect hook
const useRefInsObsEffect = (
	fn: (b: boolean) => void,
	ref: RefObject<HTMLDivElement>,
) => {
	useEffect(() => {
		const intersectionObserver = new IntersectionObserver((entries) => {
			// 告知处理函数，当前div是否展示在视口
			fn(entries[0]?.isIntersecting);
		});
		ref.current && intersectionObserver.observe(ref.current);
		return () => {
			ref.current && intersectionObserver.unobserve(ref.current);
		};
	}, []);
};

// state hook
const useRefInsObjState = (ref: RefObject<HTMLDivElement>, path: string) => {
	const [list, setList] = useState<Array<any>>([]);
	const listRef = useRef<Array<any>>([]);
	const lockRef = useRef<boolean>(true);
	useEffect(() => {
		const intersectionObserver = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting && lockRef.current) {
				lockRef.current = false;
				apiGet({
					url: path,
					startNum: listRef.current.length,
					pageSize: 10,
				}).then((res) => {
					listRef.current = [
						...listRef.current,
						...(res?.list as Array<any>),
					];
					setList(listRef.current);
					lockRef.current = true;
				}).catch(err => {})
			}
		});
		ref.current && intersectionObserver.observe(ref.current);
		return () => {
			ref.current && intersectionObserver.unobserve(ref.current);
		};
	}, []);

	return list;
};

type Props = {};
export default function Feeds({}: Props) {
	// const [list, setList] = useState<Array<any>>([]);
	const scrollRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<Array<any>>([]);
	const lockRef = useRef<boolean>(true);

	// useEffect(() => {
	// 	apiGet({
	// 		url: "/feeds",
	// 		startNum: 0,
	// 		pageSize: 10,
	// 	}).then((res) => {
	// 		setList(res?.list);
	// 	});
	// }, []);

	// useRefInsObsEffect((b) => {
	// 	if (b && lockRef?.current) {
	// 		lockRef.current = false;
	// 		apiGet({
	// 			url: "/feeds",
	// 			startNum: listRef.current.length,
	// 			pageSize: 10,
	// 		}).then((res) => {
	// 			listRef.current = [
	// 				...listRef.current,
	// 				...(res?.list as Array<any>),
	// 			];
	// 			setList(listRef.current);
	// 			lockRef.current = true;
	// 		});
	// 	}
	// }, scrollRef);

	const list = useRefInsObjState(scrollRef, "/feeds");

	return (
		<div className="border-t">
			{list?.map((item) => <RecommendData item={item} key={item.id} />)}
			{/* 只要这个div展示，代表需要加载数据 */}
			<div
				ref={scrollRef}
				className="flex justify-center h-14 items-center text-slate-500"
			>
				loading
			</div>
		</div>
	);
}

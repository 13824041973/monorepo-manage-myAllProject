import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from '@koa/cors'
// 虽然没使用，但是必须import它让其装饰器都运行，下面的controllers数组才有值
import controller from './controllers/index'
import { controllers } from "./utils/decorator";
import { jwtVerify } from "./utils/jwt";

const app = new Koa();
app.use(cors())
const router = new Router();
app.use(bodyParser({}));

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*')
	ctx.set('Access-Control-Allow-Header', '*')
	ctx.set('Access-Control-Allow-Methods', '*')
	ctx.set('Content-Type', 'application/json;charset=utf-8')

	if (ctx.request.method.toLowerCase === 'options') {
		ctx.status = 200
	} else {
		await next(ctx)
	}
})


const COMMON_API_PREFIX = "/api";
controllers.forEach(item => {
	let { method, path, handler, constructor } = item;
	const { prefix } = constructor

	if (prefix) {
		path = `${COMMON_API_PREFIX}${prefix}${path}`
	} else {
		path = `${COMMON_API_PREFIX}${path}`
	}

	router[method](path, handler)
})

app.use(jwtVerify([`${COMMON_API_PREFIX}/user/login`]))

app.use(router.routes());

app.listen(3010, () => {
	console.log("koa is run in 3010");
});

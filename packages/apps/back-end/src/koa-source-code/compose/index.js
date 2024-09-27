// 仿koa源码里 compose 函数

function discount(ctx, next) {
    console.log("starting discount");
    next(ctx * 0.8)
    console.log("ending discount");
}

function num(ctx, next) {
    console.log("starting num");
    next(ctx / 0.8)
    console.log("ending num");
}

function express(ctx, next) {
    console.log("starting express");
    next(ctx * 10)
    console.log("ending express");
}

function compose(args) {
    let result
    return function (ctx) {
        // next 的本质就是下一个函数
        const dispatch = function (i, ctx) {
            let fn
            if (i < args.length) fn = args[i];
            if (i === args.length) {
                result = ctx
                return
            }
            fn(ctx, (ctx) => dispatch(++i, ctx))
        }
        dispatch(0, ctx)
        return result
    }
}

// const c = compose([discount, num, express])
// console.log(c(10));

/**
    starting discount
    starting num
    starting express
    ending express
    ending num
    ending discount
    100
 */

async function async_discount(ctx, next) {
    console.log("starting discount");
    await next(ctx.a = 10)
    console.log("ending discount");
    // 在这里return ctx的话，下面打印@@res，就回打印出 { a: 20 }
    // return ctx
}

async function async_num(ctx, next) {
    console.log("starting num");
    await next(ctx.a = 20)
    console.log("ending num");
}

async function async_express(ctx, next) {
    console.log("starting express");
    await next(ctx.a = 20)
    console.log("ending express");
}

function koa_compose(middleware) {
    // middleware is a function array
    return function (ctx, next) {
        let index = -1
        const dispatch = function (i) {
            if (i <= index) return Promise.reject(new Error(`next() called multiple times`))
            index = i
            let fn = middleware[i]
            if (i === middleware.length) fn = next
            if (!fn) return Promise.resolve()
            return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
        }
        return dispatch(0)
    }
}

const c = koa_compose([async_discount, async_num, async_express])
c({}).then(res => {
    console.log("@@", res);
})
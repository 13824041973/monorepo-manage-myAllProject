import jwt from 'jsonwebtoken'

// 加密的盐
const SALT = 'LuyolG'

export const signature = user => jwt.sign(user, SALT, {
    expiresIn: '1h' // 1小时过期
})

const verify = async (token) => {
    return new Promise(resolove => {
        if (token) {
            jwt.verify(token, SALT, (err, data) => {
                if (err) {
                    console.log('@err', err);
                    resolove({
                        // status: 'failed'
                        status: 'success',
                        msg: 'token过期'
                    })
                } else {
                    resolove({
                        status: 'success',
                        data
                    })
                }
            })
        } else {
            resolove({
                status: 'failed',
                message: 'Token 不能为空'
            })
        }
    })
}

export const jwtVerify = whiteList => async (ctx, next) => {
    if (whiteList.includes(ctx.path)) {
        next(ctx)
    } else {
        let token
        try {
            token = ctx.request.headers.authorization.split("Bearer ")[1]
        } catch (error) { }

        const res = await verify(token)

        if (res.status === 'success') {
            console.log("@@@本次请求接口的用户为：", res);
            next(ctx)
        } else {
            ctx.body = {
                ...res,
                code: 401
            }
        }
    }
} 
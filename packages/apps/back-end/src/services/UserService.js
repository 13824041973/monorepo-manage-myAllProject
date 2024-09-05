import { signature } from "../utils/jwt"

export default class UserService {
    async validate({ username, password }) {
        if (username && password) {
            if (username === 'lyl' || username === 'LuyolG') {
                if (password === '123456') {
                    const token = signature({ username })
                    return {
                        code: 200,
                        msg: '登录成功',
                        status: 'success',
                        data: {
                            token
                        }
                    }
                }
                return {
                    code: 200,
                    msg: '密码错误',
                    status: 'failed'
                }
            }
            return {
                code: 200,
                msg: '账号未注册',
                status: 'failed'
            }
        }

        return {
            code: 200,
            msg: '账密不能为空',
            status: 'failed'
        }
    }
}
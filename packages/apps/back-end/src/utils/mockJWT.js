// JWT, 本质就是一个 三段的 base64
// header 
// payload 
// header + payload 生成一段秘钥 - 加盐 - salt

const crypto = require('crypto');

function sign(payload, salt) {
    const header = { alg: "HS256", type: "JWT" }
    const tokenArr = []
    tokenArr.push(base64urlEncode(JSON.stringify(header)))
    tokenArr.push(base64urlEncode(JSON.stringify(payload)))
    const signature = encryption(tokenArr.join('.'), salt)

    return [...tokenArr, signature].join('.')
}

function verify(token, salt) {
    const [header, payload, signature] = token.split('.')
    const newSignature = encryption(header + '.' + payload, salt)
    return newSignature === signature
}

function base64urlEncode(str) {
    return Buffer.from(str).toString('base64')
}
function encryption(value, salt) {
    return crypto.createHmac("SHA256", salt).update(value).digest("base64")
}

console.log(sign({ username: 'lyl' }, 'xxx'));

console.log(verify('eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ==.eyJ1c2VybmFtZSI6Imx5bCJ9.R991EbUUyjsm8HjPYCpT0evcqjME/jjKATwoVjh3UvE=', 'xxx'));
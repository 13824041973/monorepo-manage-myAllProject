const express = require('express');
const cors = require('cors');
const list = require('./mock')

const app = express();
const router = express.Router()
app.use(cors())


router.get('/api/feeds', (req, res) => {
    const { startNum = 0, pageSize = 10 } = req.query || {}
    const resList = list.slice(Number(startNum), Number(startNum) + Number(pageSize))
    res.json({ list: resList })
})

app.use(router)

app.listen(3010, () => {
    console.log('app run in 3010');
})
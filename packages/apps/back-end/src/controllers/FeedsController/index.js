import { Controller, RequestMapping, RequestMethod } from "../../utils/decorator";
import list from './mock'

export default class FeedsController {
    @RequestMapping(RequestMethod.GET, "/feeds")
    async getFeeds(ctx) {
        const { startNum = 0, pageSize = 10 } = ctx.query || {}
        const resList = list.slice(Number(startNum), Number(startNum) + Number(pageSize))
        ctx.body = { list: resList }
    }
}
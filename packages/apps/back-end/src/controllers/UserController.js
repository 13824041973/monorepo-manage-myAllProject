import UserService from "../services/UserService";
import { Controller, RequestMapping, RequestMethod } from "../utils/decorator";

@Controller("/user")
export default class UserController {
	@RequestMapping(RequestMethod.GET, "/all")
	async getAllUser(ctx) {
		ctx.body = {
			data: ["lyl", "krl", "qsj"],
		};
	}

	@RequestMapping(RequestMethod.POST, "/login")
	async loginUser(ctx) {
		const { body } = ctx.request;
		const userService = new UserService()
		ctx.body = await userService.validate(body)
	}
}

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UpdateValidator from "App/Validators/People/User/UpdateValidator";
import StoreValidator from "App/Validators/People/User/StoreValidator";
import CreateUser from "App/Repos/People/User/CreateUser";

export default class UsersController {
    async index({ auth, request, response, ...options }: HttpContextContract) {
        var {
            associations = [],
            roles = [],
            search,
            page = 1,
            perPage = 100,
            sortBy = "name",
            sortOrder = "asc"
        } = request.get();

        var query = User.query().orderBy(sortBy, sortOrder)

        for (const association of associations) query.preload(association);

        // if (typeof search !== "undefined") {
        //     query.apply((scopes) => scopes.search(search));
        //   }

        const results = await query.paginate(page, perPage)

        return response.json(results)
    }

    async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(StoreValidator);

        const user = await new CreateUser().handle(payload)

        return response.json({
            status: true,
            user
        })
    }

    async show({ request, response, params }) {
        const { associations = [] } = request.get()

        let query = User.query()
            .where("id", params.id)
            .where("active", true)
            .orWhere("username", params.id)
            .orWhere("email", params.id)
            .orWhere("phone", params.id);

        for (const association of associations) query = query.preload(association)

        const user = await query.firstOrFail()

        return response.json({
            status: true,
            user,
        })
    }

    async update({ request, response, params }) {
        const payload = await request.validate(UpdateValidator);
        let user = await User.findOrFail(params.id);

        for (const key in payload) {
            user[key] = typeof payload[key] != undefined ? payload[key] : user[key];
        }

        await user.save();

        return response.json({
            status: true,
            user,
        })
    }

    async destroy({ response, params }) {
        let user = await User.query()
            .where("id", params.id)
            .orWhere("phone", params.id)
            .orWhere("email", params.id)
            .firstOrFail()

        user.active = false
        await user.save()

        return response.json({
            status: true,
            user,
        })
    }
}

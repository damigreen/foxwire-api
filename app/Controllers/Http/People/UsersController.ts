import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UpdateValidator from "App/Validators/People/User/UpdateValidator";
import StoreValidator from "App/Validators/People/User/StoreValidator";
import Create from "App/Repos/People/User/CreateUser";

export default class UsersController {
    async index({ request, response }: HttpContextContract) {
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

        return response.json({
            status: true,
        })
    }

    async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(StoreValidator);
        // const { name, gender, email, password, phone, roles } = payload;

        const user = await new Create().handle(payload)


        // TODO
        // create role user db relationship
        // sync relatiionship


        // TODO
        // send welcome mail and
        // Send email to activate account
        // click on login link to activate


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

    async destroy({ auth, response, params }) {
        let user = await User.query()
            .where("id", params.id)
            .orWhere("phone", params.id)
            .orWhere("email", params.id)
            .firstOrFail()


        await user.delete();

        return response.json({
            status: true,
            user,
        })
    }
}

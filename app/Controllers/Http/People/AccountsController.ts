import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';
import Account from 'App/Models/People/Account';
import Create from 'App/Repos/People/Account/Create';
import StoreValidator from 'App/Validators/People/Account/StoreValidator';

export default class AccountsController {
    public async index({ request, response }: HttpContextContract) {
        var {
            associations = [],
            search,
            page = 1,
            perPage = 100,
            sortBy = "name",
            sortOrder = "asc"
        } = request.get();

        var query = Account.query()
            .orderBy(sortBy, sortOrder)
            .preload("user");

        for (const association of associations) query.preload(association);

        if (typeof search !== "undefined") {
            query.apply((scopes) => scopes.search(search));
        }

        const results = await query.paginate(page, perPage);

        return response.json(results);
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(StoreValidator)

        const account = await new Create().handle(payload)

        response.json({
            status: true,
            account
        })
    }

    public async show({ params, request, response }: HttpContextContract) {
        const { associations = [] } = request.get()

        let query = Account.query()
            .where("id", params.id)

        for (const association of associations) query = query.preload(association)

        const account = await query.firstOrFail()

        return response.json({
            status: true,
            account,
        })
    }

    //   public async edit({}: HttpContextContract) {}

    public async update({ params, request, response }: HttpContextContract) {
        const payload = await request.validate(StoreValidator)

        let account = await Account.findOrFail(params.id);

        for (const key in payload) {
            account[key] = typeof payload[key] != undefined ? payload[key] : account[key];
        }

        await account.save();

        return response.json({
            status: true,
            account
        })
    }

    public async destroy({ }: HttpContextContract) { }

    // call on update
    public async changeName({ request, response }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                accountId: schema.number(),
                name: schema.string()
            })
        })

        const { accountId, name } = payload;

        const account = await Account.findOrFail(accountId);

        account.name = name;

        await account.save();

        return response.json({
            status: true,
            message: "Account name changed successfully!"
        })
    }
}

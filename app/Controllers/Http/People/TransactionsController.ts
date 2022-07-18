import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Transaction from "App/Models/People/Transaction";
import StoreValidator from "App/Validators/People/Transaction/StoreValidator";
import Create from "App/Repos/People/Transaction/Create";

export default class TransactionsController {
  public async index({ auth, request, response }: HttpContextContract) {
    let {
      associations = [],
      search = null,
      page = 1,
      perPage = 100,
      sortBy = "name",
      sortOrder = "asc",
    } = request.get();

    var query = Transaction.query().orderBy(sortBy, sortOrder);

    for (const association of associations) query.preload(association);

    query.apply((scopes) => scopes.byUser(auth.user));

    if (typeof search !== "undefined") {
      query.apply((scopes) => {
        scopes.search(search);
      });
    }

    const results = await query.paginate(page, perPage);

    return response.json(results);
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreValidator);

    let transaction = await new Create().handle(payload);

    return response.json({
      status: true,
      transaction,
    });
  }

  public async show({ params, request, response }: HttpContextContract) {
    const { associations = [] } = request.get();

    let query = Transaction.query()
      .where("id", params.id)

    for (const association of associations) query = query.preload(association);

    const user = await query.firstOrFail();

    return response.json({
      status: true,
      user,
    });
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

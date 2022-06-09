import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import WebHook from "App/Models/System/WebHook";
import StoreValidator from "App/Validators/System/WebHook/StoreValidator";
import UpdateValidator from "App/Validators/System/WebHook/UpdateValidator";
import CreateWebHook from "App/Repos/System/WebHook/Create";
import UpdateWebHook from "App/Repos/System/WebHook/Update";

export default class WebHooksController {
  public async index({ auth, request, response }: HttpContextContract) {
    var {
      associations = [],
      page = 1,
      perPage = 100,
      sortBy = "name",
      sortOrder = "asc",
    } = request.get();

    var query = WebHook.query().orderBy(sortBy, sortOrder);

    for (const association of associations) query.preload(association);

    query.apply((scopes) => scopes.byUser(auth.user));

    const results = await query.paginate(page, perPage);

    return response.json(results);
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreValidator);

    const webHook = await new CreateWebHook().handle(payload, request);

    response.json({
      status: true,
      webHook,
    });
  }

  public async show({ params, request, response }: HttpContextContract) {
    const { associations = [] } = request.get();

    let query = WebHook.query().where("id", params.id);

    for (const association of associations) query = query.preload(association);

    const user = await query.firstOrFail();

    return response.json({
      status: true,
      user,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateValidator);

    const webHook = await new UpdateWebHook().handle(
      params.id,
      payload,
      request
    );

    response.json({
      status: true,
      webHook,
    });
  }

  public async destroy({}: HttpContextContract) {}
}

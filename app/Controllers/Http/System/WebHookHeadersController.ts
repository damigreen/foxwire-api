import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import WebHookHeader from "App/Models/System/WebHookHeader";

export default class WebHookHeadersController {
  public async index({ auth, request, response }: HttpContextContract) {
    var {
      associations = [],
      page = 1,
      perPage = 100,
      sortBy = "name",
      sortOrder = "asc",
    } = request.get();

    var query = WebHookHeader.query().orderBy(sortBy, sortOrder);

    for (const association of associations) query.preload(association);

    query.apply((scopes) => scopes.byUser(auth.user));

    const results = await query.paginate(page, perPage);

    return response.json(results);
  }

  public async show({ params, request, response }: HttpContextContract) {
    const { associations = [] } = request.get();

    let query = WebHookHeader.query().where("id", params.id);

    for (const association of associations) query = query.preload(association);

    const user = await query.firstOrFail();

    return response.json({
      status: true,
      user,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    let webHookHeader = WebHookHeader.query().where("id", params.id);

    await webHookHeader.delete();

    return response.json({
      status: true,
      message: "Web hook header deleted",
    });
  }
}

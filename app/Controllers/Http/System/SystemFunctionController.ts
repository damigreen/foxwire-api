import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SystemFunction from "App/Models/System/SystemFunction";

export default class SystemFunctionController {
  /**
   * Show a list of all systementities.
   * GET systementities
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  public async index({ auth, request, response }: HttpContextContract) {
    var {
      associations = [],
      page = 1,
      perPage = 100,
      sortBy = "name",
      sortOrder = "asc",
    } = request.get();

    var query = SystemFunction.query().orderBy(sortBy, sortOrder);

    for (const association of associations) query.preload(association);

    query.apply((scopes) => scopes.byUser(auth.user));

    const results = await query.paginate(page, perPage);

    return response.json(results);
  }

  public async store({}: HttpContextContract) {}

  /**
   * Display a single systemfunction.
   * GET system-functions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Params} ctx.params
   */
  async show({ request, response, params }) {
    const { associations = [] } = request.get();

    let query = SystemFunction.query().where("id", params.id);

    for (const association of associations) query = query.preload(association);

    const systemFunction = await query.firstOrFail();

    return response.json({
      status: true,
      systemFunction,
    });
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

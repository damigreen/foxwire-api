import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SystemEventTrigger from "App/Models/System/SystemEventTrigger";

export default class SystemEventTriggerController {
  /**
   * Show a list of all systemeventtrigger.
   * GET systemeventtrigger
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

    var query = SystemEventTrigger.query().orderBy(sortBy, sortOrder);

    for (const association of associations) query.preload(association);

    query.apply((scopes) => scopes.byUser(auth.user));

    const results = await query.paginate(page, perPage);

    return response.json(results);
  }

  public async store({}: HttpContextContract) {}

  /**
   * Display a single systemeventtrigger.
   * GET system-event-triggers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Params} ctx.params
   */
  async show({ request, response, params }) {
    const { associations = [] } = request.get();

    let query = SystemEventTrigger.query().where("id", params.id);

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

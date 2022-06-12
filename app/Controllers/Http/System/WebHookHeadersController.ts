import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import WebHookHeader from "App/Models/System/WebHookHeader";

/**
 * Resourceful controller for interacting with webhookheaders
 */
export default class WebHookHeadersController {
  /**
   * Show a list of all webhookheaders.
   * GET webhookheaders
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

    var query = WebHookHeader.query().orderBy(sortBy, sortOrder);

    for (const association of associations) query.preload(association);

    query.apply((scopes) => scopes.byUser(auth.user));

    const results = await query.paginate(page, perPage);

    return response.json(results);
  }

  /**
   * Display a single webhookheader.
   * GET webhookheaders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Params} ctx.params
   */
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

  /**
   * Delete a webhookheader with id.
   * DELETE webhookheaders/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  public async destroy({ params, response }: HttpContextContract) {
    let webHookHeader = WebHookHeader.query().where("id", params.id);

    await webHookHeader.delete();

    return response.json({
      status: true,
      message: "Web hook header deleted",
    });
  }
}

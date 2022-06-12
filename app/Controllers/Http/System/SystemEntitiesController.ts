import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SystemEntities from "App/Models/System/SystemEntity";

/**
 * Resourceful controller for interacting with systementities
 */
export default class SystemEntitiesController {
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

    var query = SystemEntities.query().orderBy(sortBy, sortOrder);

    for (const association of associations) query.preload(association);

    query.apply((scopes) => scopes.byUser(auth.user));

    const results = await query.paginate(page, perPage);

    return response.json(results);
  }

  /**
   * Create/save a new systementity.
   * POST systementites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  public async store({}: HttpContextContract) {}

  /**
   * Display a single systementy.
   * GET systementites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Params} ctx.params
   */
  public async show({}: HttpContextContract) {}

  /**
   * Update systementity details.
   * PUT or PATCH systementites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  public async update({}: HttpContextContract) {}

  /**
   * Delete a systementity with id.
   * DELETE systementites/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  public async destroy({}: HttpContextContract) {}
}

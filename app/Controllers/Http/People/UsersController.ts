import { Exception } from "@poppinss/utils";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UpdateValidator from "App/Validators/People/User/UpdateValidator";
import StoreValidator from "App/Validators/People/User/StoreValidator";
import Create from "App/Repos/People/User/Create";
import Update from "App/Repos/People/User/Update";

/**
 * Resourceful controller for interacting with users
 */
export default class UsersController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ auth, request, response }: HttpContextContract) {
    var {
      associations = [],
      // roles = [],
      search,
      page = 1,
      perPage = 100,
      sortBy = "name",
      sortOrder = "asc",
    } = request.get();

    var query = User.query().orderBy(sortBy, sortOrder);

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

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }: HttpContextContract) {
    let user;
    try {
      const payload = await request.validate(StoreValidator);
      user = await new Create().handle(payload);
    } catch (error) {
      throw new Exception(error);
    }

    return response.json({
      status: true,
      user,
    });
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Params} ctx.params
   */
  async show({ request, response, params }) {
    const { associations = [] } = request.get();

    let query = User.query()
      .where("id", params.id)
      .where("active", true)
      .orWhere("username", params.id)
      .orWhere("email", params.id)
      .orWhere("phone", params.id);

    for (const association of associations) query = query.preload(association);

    const user = await query.firstOrFail();

    return response.json({
      status: true,
      user,
    });
  }

  /**
   * Update systementity details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, params }) {
    const payload = await request.validate(UpdateValidator);

    let user = await new Update().handle({ id: params.id, ...payload });

    return response.json({
      status: true,
      user,
    });
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  async destroy({ auth, response, params }) {
    let user = await User.query()
      .where("id", params.id)
      .orWhere("phone", params.id)
      .orWhere("email", params.id)
      .apply((scopes) => scopes.byUser(auth.user))
      .firstOrFail();

    user.active = false;
    await user.save();

    return response.json({
      status: true,
      message: "success",
    });
  }
}

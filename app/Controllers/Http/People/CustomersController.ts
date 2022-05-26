import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/People/Customer';
import Create from 'App/Repos/People/Customer/Create';
import Update from 'App/Repos/People/Customer/Update';


export default class CustomersController {
  public async index({ request, response }: HttpContextContract) {
    var {
      associations = [],
      page = 1,
      perPage = 100,
      sortBy = "created_at",
      sortOrder = "asc"
    } = request.get();

    var query = Customer.query().orderBy(sortBy, sortOrder)

    for (const association of associations) query.preload(association);

    const results = await query.paginate(page, perPage)

    return response.json(results)
  }

  // public async create({ }: HttpContextContract) { }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        userId: schema.number()
      })
    })

    const customer = await new Create().handle(payload)

    return response.json({
      status: true,
      customer
    })
  }

  public async show({ params, request, response }: HttpContextContract) {
    const { associations = [] } = request.get()

    let query = Customer.query()
      .where("id", params.id)

    for (const association of associations) query = query.preload(association)

    const customer = await query.firstOrFail()

    return response.json({
      status: true,
      customer,
    })
  }

  // public async edit({ }: HttpContextContract) { }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        userId: schema.number()
      })
    })

    const customer = await new Update().handle({ id: params.id, ...payload })

    return response.json({
      status: true,
      customer
    })
  }

  // public async destroy({ }: HttpContextContract) { }
}

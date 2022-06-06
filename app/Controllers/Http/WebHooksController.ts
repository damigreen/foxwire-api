import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WebHooksController {

  public async moveToScoping({ request, response }: HttpContextContract) {
    // console.log(request);
    console.log("move to scoping===========>");
    console.log(request.all())
    return response.json({ status: true })
  }

  public async approve({ request, response }: HttpContextContract) {
    console.log("approve===========>");
    console.log(request.all())
    return response.json({ status: true })
  }

  public async completed({ request, response }: HttpContextContract) {
    // console.log(request);
    console.log("completed===========>");
    console.log(request.all())
    return response.json({ status: true })
  }

  public async started({ request, response }: HttpContextContract) {
    console.log("this.started===========>");
    console.log(request.all())
    return response.json({ status: true })
  }

  public async index({ }: HttpContextContract) { }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}

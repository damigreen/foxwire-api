// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RolesController {
    async index({ request, response }) {
        console.log(true)
        return response.json("God is good")
    }
}

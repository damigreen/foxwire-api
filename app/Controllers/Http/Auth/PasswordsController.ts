import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PasswordsController {
    async sendCode({ request, response }: HttpContextContract) {
        return response.json("reset password")
    }
}

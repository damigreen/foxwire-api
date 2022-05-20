import Event from '@ioc:Adonis/Core/Event';
import User from 'App/Models/User';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResetCodeValidator from 'App/Validators/Password/ResetCodeValidator'
import PasswordReset from 'App/Models/Auth/PasswordReset';

export default class PasswordsController {
    async sendCode({ request, response }: HttpContextContract) {
        const payload = await request.validate(ResetCodeValidator);

        const {
            email, phone, type
        } = payload

        const user = await User.query()
            .where("email", email ? email : "")
            .orWhere("phone", phone ? phone : "")
            .firstOrFail()

        let resetCode
        do {
            resetCode = Math.floor(Math.random() * 90000) + 10000;
        } while (await PasswordReset.findBy("code", resetCode) != null)

        const oldPasswordResetCode = await PasswordReset.query().where("user_id", user.id)

        for (let i = 0; i < oldPasswordResetCode.length; i++) {
            oldPasswordResetCode[i]?.delete()
        }

        PasswordReset.create({
            userId: user.id,
            code: resetCode,
            used: false
        })

        await Event.emit("password/reset-code-generated", { user, resetCode, type })
        
        return response.json({
            status: true,
            message: `a password reset code has been sent to your ${type}`
        })
    }
}

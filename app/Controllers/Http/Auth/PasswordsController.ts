import { schema } from '@ioc:Adonis/Core/Validator';
import { Exception } from '@poppinss/utils';
import Event from '@ioc:Adonis/Core/Event';
import User from 'App/Models/User';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResetCodeValidator from 'App/Validators/Password/ResetCodeValidator'
import PasswordReset from 'App/Models/Auth/PasswordReset';
import passwordResetConfig from 'Config/passwordReset';
import PasswordResetValidator from 'App/Validators/Auth/PasswordResetValidator';
// import CtxExtendContract from 'Contracts/ctxExtend';

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


    /**
     * * Verify and reset
     * validate api parameters, {code, new_password}
     * get the code from password_reset table
     * check if it is expired
        * delete from table if expired
        * throw exception
    * get user from user_id
    * save password
    * delete password_reset row
    * login user
    * return token as response
    * 
     */
    async verifyAndReset({ auth, request, response }) {
        let token;
        try {
            const payload = await request.validate(PasswordResetValidator)

            const { code, password } = payload;

            let passwordReset = await PasswordReset.findByOrFail("code", code);

            if (
                Math.abs(passwordReset.createdAt.diffNow().milliseconds) >
                passwordResetConfig.expiryTime

            ) {
                passwordReset.delete();
                throw new Exception("reset code has expired");
            }

            let user = await User.findByOrFail("id", passwordReset.userId)

            user.password = password;
            await user.save();

            await passwordReset.delete()

            token = await auth.use('api').login(user)

        } catch (error) {
            throw new Exception(error, 400);
        }

        return response.json({
            status: true,
            token
        })
    }


    /**
     * * Change
     * validate api parameters, {code, new_password}
     * get the code from password_reset table
     * check if it is expired
        * delete from table if expired
        * throw exception
    * get user from user_id
    * save password
    * delete password_reset row
    * login user
    * return token as response
    * 
     */
    async change({ auth, request, response }) {
        const payload = await request.validate({
            schema: schema.create({
                password: schema.string()
            })
        })

        const { password } = payload;

        
        const user = await User.findOrFail(auth.user.id)

        user.password = password;

        await user.save();

        return response.json({
            status: true,
            message: "password changed successfully"
        })
    }
}

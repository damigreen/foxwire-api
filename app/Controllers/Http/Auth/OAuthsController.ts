// import { Exception } from '@adonisjs/core/build/standalone';
// import { validator, schema } from '@ioc:Adoni    s/Core/Validator'
// import CtxExtendContract from "Contracts/ctxExtend";
import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'
import LoginValidator from 'App/Validators/Auth/LoginValidator';
import { Exception } from "@poppinss/utils";



class OAuthsController {
    async login({ auth, request, response }) {
        const payload = await request.validate(LoginValidator);
        const { username, password } = payload

        let token
        try {
            const user = await User.query()
                .where("active", true)
                .where("email", username)
                .orWhere("username", username)
                .firstOrFail();

            // Verify password
            if (!(await Hash.verify(user.password, password))) {
                return response.badRequest('Invalid credentials')
            }

            token = await auth.use('api').attempt(username, password);
        } catch (error) {
            throw new Exception("user account has been suspended")
            console.log(error);
        }

        response.json({
            status: true,
            token,
        });
    }

    async logout({ auth, response }) {
        await auth.use("api").logout()

        return response.json({
            message: "user logged out"
        })
    }

    async me({ auth, response }) {
        await auth.use("api").logout()

        return response.json({
            message: "user logged out"
        })
    }
}

module.exports = OAuthsController;

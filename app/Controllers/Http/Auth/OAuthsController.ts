import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'
import LoginValidator from 'App/Validators/Auth/LoginValidator';
import { Exception } from "@poppinss/utils";



class OAuthsController {
    async login({ auth, request, response }) {
        const payload = await request.validate(LoginValidator);
        const { uniq_id, password } = payload

        let token
        try {
            const user = await User.query()
                .where("active", true)
                .where("email", uniq_id)
                .orWhere("username", uniq_id)
                .firstOrFail();

            // Verify password
            if (!(await Hash.verify(user.password, password))) {
                return response.badRequest('Invalid credentials')
            }

            token = await auth.use('api').attempt(uniq_id, password);
        } catch (error) {
            console.log(error);
            throw new Exception("user account has been suspended")
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

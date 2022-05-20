import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'
import LoginValidator from 'App/Validators/Auth/LoginValidator';
import { Exception } from "@poppinss/utils";


class OAuthsController {
    async index({ view, response }) {
        const html = view.render("emails/people/welcome", { user: { email: "fashfired@gmail.com", phone: "07061935742" } })
        // const html = view.render("emails/auth/verify-email", { user: { email: "fashfired@gmail.com", phone: "07061935742" } })
        // return response.json({ message: "God is good" })
        return html;
    }

    // ! bug
    // dissable route to debug
    async redirect({ auth, response }) {
        response.status(401).json({
            "errors": [
                {
                    "message": "E_UNAUTHORIZED_ACCESS: Unauthorized access"
                }
            ]
        })
    }

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
            throw new Exception("Email has not been activated")
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

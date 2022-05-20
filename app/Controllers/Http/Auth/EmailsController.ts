import { Exception } from '@poppinss/utils';
import User from 'App/Models/User';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailsController {
    // click on verify button
    // get user 
    // change user active field to 1 (true)
    // update

    async verify({ params, response }) {
        let user
        try {
            user = await User.query()
                .where("id", params.id)
                .firstOrFail()

            if (user.active == true) {
                return response.status(400).json({
                    status: true,
                    message: "Email already activated"
                })
            }
            
            user.active = true;
            user.save();
        } catch (error) {
            throw new Exception("Not allowed")
        }

        return response.json({
            status: true,
            message: "Email has been verified"
        })
    }
}

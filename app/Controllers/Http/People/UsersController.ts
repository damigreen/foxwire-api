import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Event from "@ioc:Adonis/Core/Event";
import User from "App/Models/User";
import UpdateValidator from "App/Validators/People/User/UpdateValidator";
import StoreValidator from "App/Validators/People/User/StoreValidator"

export default class UsersController {
    async index({ request, response }: HttpContextContract) {
        return response.json({
            status: true,
        })
    }

    async store({ request, response }: HttpContextContract) {
        // const payload = await request.validate(StoreValidator);
        // const { name, email, password, phone, roles } = payload;

        // const username = payload.name.slice(0, payload.name.indexOf(' '))

        // TODO
        // create role user db relationship
        // sync relatiionship

        // Format phone number for whatsapp
        // if (phone.startsWith("+234") && phone[4] != 0) {
        //     phone = phone
        // } else if (phone.startsWith("+234") && phone[4] == 0) {
        //     phone = phone.replace("0", "")
        // } else if (phone.startsWith("0") && phone.length == 11) {
        //     phone = "+234" + phone.substring(1);
        // }

        // const user = await User.firstOrCreate({
        //     name: name,
        //     username: username,
        //     email: email,
        //     phone: phone,
        //     password: password
        // })
        const user = await User.firstOrCreate({
            name: "name9",
            username: "use5name9",
            email: "email9@gmail.com",
            phone: "phone9",
            password: "password"
        })

        // TODO
        // send welcome mail and
        // Send email to activate account
        // click on login link to activate

        Event.emit("user/created", { user })

        return response.json({
            status: true,
            user
        })
    }

    async show({ request, response, params }) {
        const query = await User.query()
            .where("id", params.id)
            .where("active", true)
            .orWhere("username", params.id)
            .orWhere("email", params.id)
            .orWhere("phone", params.id);

        const user = await User.firstOrFail()
        // const users = query
        console.log(user)

        return response.json({
            status: true,
            user,
        })
    }

    async update({ request, response, params }) {
        console.log("updating")
        const payload = await request.validate(UpdateValidator);
        let user = await User.findOrFail(params.id);
        console.log("user!!!")

        for (const key in payload) {
            user[key] = typeof payload[key] != undefined ? payload[key] : user[key];
        }

        await user.save();

        return response.json({
            status: true,
            user,
        })

    }
}

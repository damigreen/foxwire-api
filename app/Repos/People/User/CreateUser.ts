import User from "App/Models/User";
import Event from "@ioc:Adonis/Core/Event";


export default class Create {
    async handle({ name, gender, email, password, roles, phone, ...params }) {

        const username = name.slice(0, name.indexOf(' '))

        const user = await User.firstOrCreate({
            name,
            username,
            email,
            phone,
            password
        })

        Event.emit("user/created", { user })

        return user;
    }
}
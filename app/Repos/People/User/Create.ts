import Role from 'App/Models/People/Role';
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

        let roleIds = (await Role.query().whereIn("code", roles)).map(role => role.id)

        await user.related("roles").attach(roleIds)

        Event.emit("user/created", { user })

        return user;
    }
}
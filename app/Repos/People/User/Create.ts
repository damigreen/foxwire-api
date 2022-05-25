import CreateAccount from 'App/Repos/People/Account/Create';
import { hashCode } from './../../../Helpers/index';
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

        const account_unique_id = hashCode(user.name)

        // const userAccount = await user.related("accounts").create({
        //     name: username + account_unique_id,
        //     accountUniqueId: account_unique_id,
        //     userId: user.id,
        //     accountTypeId: 1,
        // })
        const accountName = username + account_unique_id
        const accountData = { name: accountName, userId: user.id, accountTypeId: 1 }
        await new CreateAccount().handle(accountData)

        await user.preload('accounts');

        Event.emit("user/created", { user })

        // return { user, userAccount };
        return user;
    }
}
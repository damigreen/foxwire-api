import CreateCustomer from 'App/Repos/People/Customer/Create';
import CreateAccount from 'App/Repos/People/Account/Create';
import { hashCode } from './../../../Helpers/index';
import Role from 'App/Models/People/Role';
import User from "App/Models/User";
import Event from "@ioc:Adonis/Core/Event";


export default class Create {
    async handle({ name, gender, email, password, roles, phone }) {

        const username = name.slice(0, name.indexOf(' '))

        const user = await User.firstOrCreate({
            name,
            username,
            email,
            phone,
            gender,
            password
        })

        let roleQuery = await Role.query().whereIn("code", roles);
        let roleIds = roleQuery.map(role => role.id);

        await user.related("roles").attach(roleIds);

        const accountUniqueId = hashCode(12);

        const accountName = username + " - " + accountUniqueId;
        const accountData = { name: accountName, userId: user.id, accountTypeId: 1, accountUniqueId };

        const userId = user.id;
        await new CreateAccount().handle(accountData);
        await new CreateCustomer().handle({ userId });

        await user.preload('accounts');

        Event.emit("user/created", { user });

        return user;
    }
}

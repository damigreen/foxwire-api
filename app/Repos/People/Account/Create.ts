import Account from 'App/Models/People/Account';
import { hashCode } from 'App/Helpers/index';
import User from "App/Models/User";
import StoreValidator from 'App/Validators/People/Account/StoreValidator';
import { Exception } from '@adonisjs/core/build/standalone';


export default class Create {
    async handle({ name, userId, accountTypeId, accountUniqueId }: typeof StoreValidator.parsedSchema.props) {
        let account;
        try {
            const user = await User.findOrFail(userId)

            account = await Account.create({
                name: name,
                accountUniqueId,
                accountTypeId
            })

            await account.related('user').associate(user)

            await account.preload("user")

        } catch (error) {
            throw new Exception(error)
        }

        return account;
    }
}
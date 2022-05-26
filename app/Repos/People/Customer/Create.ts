import Customer from 'App/Models/People/Customer';
import { Exception } from '@adonisjs/core/build/standalone';


export default class Create {
    async handle(payload: { userId: number }) {
        let customer;
        try {
            const { userId } = payload

            customer = await Customer.create({
                userId
            })

            await customer.preload("user")

        } catch (error) {
            throw new Exception(error)
        }

        return customer;
    }
}

import Customer from "App/Models/People/Customer";


export default class Update {
    async handle(payload: { userId: number, id: number }) {

        const id = payload.id;

        let customer = await Customer.findOrFail(id);


        for (const key in payload) {
            customer[key] = typeof payload[key] != undefined ? payload[key] : customer[key];
        }

        await customer.preload("user")

        await customer.save();

        return customer;
    }
}

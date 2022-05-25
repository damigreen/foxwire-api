import User from "App/Models/User";


export default class Update {
    async handle(payload: {
        id: number,
        name?: string,
        email?: string,
        gender?: string,
        phone?: string,
        password?: string,
        username?: string,
        attached_role_ids?: Array<number>,
        detached_role_ids?: Array<number>
    }) {

        let user = await User.findOrFail(payload.id);

        for (const key in payload) {
            user[key] = typeof payload[key] != undefined ? payload[key] : user[key];
        }

        if (payload.attached_role_ids) await user.related("roles").sync(payload.attached_role_ids)
        if (payload.detached_role_ids) await user.related("roles").detach(payload.detached_role_ids)

        await user.save();

        return user;
    }
}

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Role from "App/Models/People/Role";

export default class RolesController {
    async index({ request, response }) {
        let {
            associations = [],
            page = 1,
            perPage = 10000,
            sortBy = "name",
            sortOrder = "asc"
        } = request.get();

        let query = Role.query().orderBy(sortBy, sortOrder)


        for (const association of associations) query = query.preload(association);

        const results = await query.paginate(page, perPage);

        return response.json(results)
    }
}

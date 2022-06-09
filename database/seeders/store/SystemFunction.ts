import SystemFunction from "App/Models/System/SystemFunction";
import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import functions from "Config/system-functions";
import SystemEntity from "App/Models/System/SystemEntity";
import Role from "App/Models/People/Role";


export default class SystemFunctionSeeder extends BaseSeeder {
  public static async run() {
    for (const functionData of functions) {
      const { name, code, entity_code, allowed_roles } = functionData;
      const entity = await SystemEntity.query()
        .where("code", entity_code)
        .firstOrFail();


      const roles = await Role.query().whereIn("code", allowed_roles)
      const roles_id = roles.map(role => role.id);

      const systemFunction = await SystemFunction.updateOrCreate(
        { code },
        { name, code, systemEntityId: entity.id }
      );
      await systemFunction.related("roles").sync(roles_id);
    }

    Logger.info("SystemFunctionSeeder: Seeded successfully!");
  }
}

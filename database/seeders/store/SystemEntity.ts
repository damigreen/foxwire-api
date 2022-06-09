import SystemEntityParam from "App/Models/System/SystemEntityParam";
import SystemEntity from "App/Models/System/SystemEntity";
import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class SystemEntitySeeder extends BaseSeeder {
  public static async run() {
    const entities = [
      // People
      {
        name: "User",
        code: "USR",
        interactive: true,
        params: [{ name: "User ID", property_name: "user_id" }],
      },
      { name: "Account", code: "ACC", interactive: true, params: [] },
      { name: "Customer", code: "CTM", interactive: false, params: [] },
      { name: "Role", code: "RLE", interactive: false, params: [] },
    ];

    for (const entityData of entities) {
      const { name, code, interactive, params } = entityData;
      const entity = await SystemEntity.firstOrCreate(
        { code },
        { name, code, interactive }
      );

      for (const paramData of params) {
        const { name, property_name } = paramData;
        await SystemEntityParam.firstOrCreate(
          { name },
          { name, propertyName: property_name, systemEntityId: entity.id }
        );
      }
    }

    Logger.info("SystemEntitySeeder: Seeded successfully!");
  }
}

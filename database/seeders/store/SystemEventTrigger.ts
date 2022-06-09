import SystemEntity from "App/Models/System/SystemEntity";
import SystemEventTrigger from "App/Models/System/SystemEventTrigger";
import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import triggers from "Config/event-triggers";


export default class SystemEventTriggerSeeder extends BaseSeeder {
  public static async run() {
    for (const trigger of triggers) {
      const { name, code, entity_code } = trigger;
      const entity = await SystemEntity.query()
        .where("code", entity_code)
        .firstOrFail();

      await SystemEventTrigger.updateOrCreate(
        { code },
        { name, code, SystemEntityId: entity.id }
      );
    }
    Logger.info("SystemEventTriggerSeeder: Seeded successfully!");
  }
}

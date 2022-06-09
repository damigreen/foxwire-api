import SystemAlertType from "App/Models/System/SystemAlertType";
import Logger from "@ioc:Adonis/Core/Logger";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class SystemAlertTypeSeeder extends BaseSeeder {
  public static async run() {
    const alertTypes = [
      { name: "Email", code: "email" },
      { name: "Text Message", code: "text" },
      { name: "In App Notification", code: "app-noty" },
    ];
    for (const alertType of alertTypes) {
      const { name, code } = alertType;
      await SystemAlertType.firstOrCreate({ code }, { name, code });
    }
    Logger.info("SystemAlertTypeSeeder: Seeded successfully!");
  }
}

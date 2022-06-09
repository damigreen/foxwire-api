import WebHookVerb from 'App/Models/System/WebHookVerb';
import Logger from '@ioc:Adonis/Core/Logger';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class WebHookVerbSeeder extends BaseSeeder {
  public static async run() {
    // Write your database queries inside the run method
    await WebHookVerb.updateOrCreateMany("code", [
      {
        name: "POST",
        code: "POST",
      },
      {
        name: "GET",
        code: "GET",
      },
      {
        name: "PUT",
        code: "PUT",
      },
    ])

    Logger.info("WebHookVerbSeeder: Seeded successfully!");
  }
}

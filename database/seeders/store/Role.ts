import Logger from '@ioc:Adonis/Core/Logger';
import Role from 'App/Models/People/Role';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class RoleSeeder extends BaseSeeder {
  public static async run() {
    // Write your database queries inside the run method
    await Role.updateOrCreateMany("code", [
      {
        name: "Administrator",
        code: "administrator",
        active: true,
      },
      {
        name: "Customer",
        code: "customer",
        active: true,
      },
      {
        name: "Support",
        code: "support",
        active: true,
      },
    ])

    Logger.info("RoleSeeder: Seeded successfully!");
  }
}

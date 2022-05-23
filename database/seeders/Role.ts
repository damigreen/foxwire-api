import Role from 'App/Models/People/Role';
import User from 'App/Models/User';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Role.createMany([
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
  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import AccountType from 'App/Models/People/AccountType';

export default class AccountTypeSeeder extends BaseSeeder {
  public static async run() {
    // Write your database queries inside the run method
    await AccountType.updateOrCreateMany("code", [
      {
        name: "Debit Account",
        code: "debit",
      },
      {
        name: "Credit Account",
        code: "credit",
      },
    ])

    Logger.info("AccountType: Seeded successfully!");

  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AccountType from 'App/Models/People/AccountType';

export default class AccountTypeSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await AccountType.createMany([
      {
        name: "Debit Account",
        code: "debit",
      },
      {
        name: "Credit Account",
        code: "credit",
      },
    ])
  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RoleSeeder from './store/Role'
import AccountTypeSeeeder from './store/AccountType';
import UserSeeder from './store/User';


export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    await RoleSeeder.run();
    await AccountTypeSeeeder.run();
    await UserSeeder.run();
  }
}

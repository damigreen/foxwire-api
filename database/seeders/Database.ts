import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import RoleSeeder from "./store/Role";
import AccountTypeSeeeder from "./store/AccountType";
import UserSeeder from "./store/User";
import WebHookVerbSeeder from "./store/WebHookVerbs";
import SystemEntitySeeder from "./store/SystemEntity";
import SystemEventTriggerSeeder from "./store/SystemEventTrigger";
import SystemFunctionSeeder from "./store/SystemFunction";
import SystemAlertTypeSeeder from "./store/SystemAlertType";

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    await RoleSeeder.run();
    await AccountTypeSeeeder.run();
    await UserSeeder.run();
    await WebHookVerbSeeder.run();
    await SystemEntitySeeder.run();
    await SystemEventTriggerSeeder.run();
    await SystemFunctionSeeder.run();
    await SystemAlertTypeSeeder.run();
  }
}

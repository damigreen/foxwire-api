Aimport BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class SystemAlertTypes extends BaseSchema {
  protected tableName = "system_alert_types";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.string("code");
      table.string("description");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

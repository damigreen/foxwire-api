import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SystemAlerts extends BaseSchema {
  protected tableName = 'system_alerts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name").nullable();
      table.text("content").nullable();
      table
        .integer("account_id")
        .unsigned()
        .references("id")
        .inTable("accounts")
        .nullable();
      table.timestamps();
      table.dateTime("deleted_at").nullable();
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

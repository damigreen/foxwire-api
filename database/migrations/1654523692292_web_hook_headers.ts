import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WebHookHeaders extends BaseSchema {
  protected tableName = 'web_hook_headers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name")
      table.string("value")
      table
        .integer("account_id")
        .unsigned()
        .references("id")
        .inTable("accounts")
        .onDelete("CASCADE")
      table.timestamps()
      table.dateTime("deleted_at").nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

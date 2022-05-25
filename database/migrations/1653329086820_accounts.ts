import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Accounts extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name")
      table.string("account_unique_id")
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .nullable()
        .onDelete("CASCADE");
      table
        .integer("account_type_id")
        .unsigned()
        .references("id")
        .inTable("account_types")
        .nullable()
        .onDelete("CASCADE");
      table.timestamps();
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

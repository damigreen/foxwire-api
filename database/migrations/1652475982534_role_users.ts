import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleUsers extends BaseSchema {
  protected tableName = 'role_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE")
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")

    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

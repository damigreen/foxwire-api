import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleSystemFunctions extends BaseSchema {
  protected tableName = 'role_system_function'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
      table.integer('system_function_id').unsigned().references('id').inTable('system_functions').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SystemFunctions extends BaseSchema {
  protected tableName = 'system_functions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('code')
      table.string('description')
      table
        .integer('system_entity_id')
        .unsigned()
        .references('id')
        .inTable('system_entities')
        .onDelete('CASCADE')
    })

  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

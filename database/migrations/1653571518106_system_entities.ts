import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SystemEntities extends BaseSchema {
  protected tableName = 'system_entities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('namespace')
      table.string("code", 15)
      table.string("table_name").nullable()
      table.string("description").nullable()
      table.boolean("interactive").nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

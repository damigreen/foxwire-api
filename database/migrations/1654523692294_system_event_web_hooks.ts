import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SystemEventWebHooks extends BaseSchema {
  protected tableName = 'system_event_web_hook'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('system_event_id')
        .unsigned()
        .references('id')
        .inTable('system_events')
        .onDelete('CASCADE')
      table
        .integer('web_hook_id')
        .unsigned()
        .references('id')
        .inTable('web_hooks')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

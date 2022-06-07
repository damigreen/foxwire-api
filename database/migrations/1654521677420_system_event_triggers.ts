import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SystemEventTriggers extends BaseSchema {
  protected tableName = 'system_event_triggers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name", 80).nullable();
      table.string("code", 80).nullable();
      table.text("description").nullable();
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

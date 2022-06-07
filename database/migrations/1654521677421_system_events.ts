import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SystemEvents extends BaseSchema {
  protected tableName = 'system_events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("name", 80).notNullable()
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
      table
        .integer('system_event_trigger_id')
        .unsigned()
        .references('id')
        .inTable('system_event_triggers')
        .onDelete('CASCADE')
      table
        .integer('system_entity_id')
        .unsigned()
        .references('id')
        .inTable('system_entities')
        .onDelete('CASCADE')
      table.timestamps();
      table.dateTime("deleted_at").nullable();
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

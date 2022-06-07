import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WebHooks extends BaseSchema {
  protected tableName = 'web_hooks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('url')
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
      table
        .integer('system_entity_id')
        .unsigned()
        .references('id')
        .inTable('system_entities')
        .onDelete('CASCADE')
      table
        .integer('web_hook_verb_id')
        .unsigned()
        .references('id')
        .inTable('web_hook_verbs')
        .onDelete('CASCADE')
      table.string("basic_auth_username", 80).nullable()
      table.string("basic_auth_password", 80).nullable()
      table.timestamps()
      table.dateTime("deleted_at").nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

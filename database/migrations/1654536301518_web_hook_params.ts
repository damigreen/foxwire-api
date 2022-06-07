import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WebHookParams extends BaseSchema {
  protected tableName = 'web_hook_params'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('web_hook_id').unsigned().references('id').inTable('web_hooks').onDelete('CASCADE')
      table.integer('system_entity_param_id').unsigned().references('id').inTable('system_entity_params').onDelete('CASCADE')
      table.timestamps()
      table.dateTime('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

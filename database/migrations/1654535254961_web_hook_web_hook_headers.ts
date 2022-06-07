import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WebHookWebHookHeaders extends BaseSchema {
  protected tableName = 'web_hook_web_hook_headers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('web_hook_id').unsigned().references('id').inTable('web_hooks').onDelete('CASCADE')
      table.integer('web_hook_header_id').unsigned().references('id').inTable('web_hook_headers').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

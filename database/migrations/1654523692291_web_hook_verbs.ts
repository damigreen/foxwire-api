import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WebHookVerbs extends BaseSchema {
  protected tableName = 'web_hook_verbs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('code')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

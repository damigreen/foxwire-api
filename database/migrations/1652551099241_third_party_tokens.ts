import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ThirdPartyTokens extends BaseSchema {
  protected tableName = 'third_party_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("token").nullable()
      table.string("refresh_token").nullable()
      table.float("token_expires_at", 20, 2).nullable()
      table.float("refresh_token_expires_at", 20, 2).nullable()
      table
        .integer("third_party_app_id")
        .unsigned()
        .references("id")
        .inTable("third_party_apps")
        .nullable();
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

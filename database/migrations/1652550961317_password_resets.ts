import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PasswordResets extends BaseSchema {
  protected tableName = 'password_resets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .nullable()
        .onDelete("CASCADE")
      table
        .string("code", 255)
        .notNullable()
        .unique()
        .index();
      table.boolean("used").defaultTo(false);
      table.timestamps();
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

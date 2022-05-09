import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('username').nullable().unique();
      table.string('name', 80).nullable();
      table.string('gender').nullable();
      table.string('email', 254).notNullable().unique();
      table.string('phone', 254).notNullable().unique();
      table.string('image_path', 254).nullable();
      table.string('password', 254).notNullable();
      table.boolean('active').defaultTo(false);
      table.string('remember_me_token');
      table.string('account_number');
      table.boolean("suspended").defaultTo(false);
      table.dateTime("suspended_till").nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps()
      table.dateTime("deleted_at").nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").nullable();
      table.string("code").nullable();
      table.text("description").nullable();
      table.boolean("active").defaultTo(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

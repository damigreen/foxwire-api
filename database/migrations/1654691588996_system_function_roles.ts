import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class SystemFunctionRoles extends BaseSchema {
  protected tableName = "system_function_role";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("system_function_id")
        .unsigned()
        .references("id")
        .inTable("system_functions")
        .onDelete("CASCADE");
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

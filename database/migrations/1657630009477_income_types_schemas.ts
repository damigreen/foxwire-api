import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class IncomeTypesSchemas extends BaseSchema {
  protected tableName = "income_types_schemas";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("")
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

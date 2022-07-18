import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class TransactionsSchemas extends BaseSchema {
  protected tableName = "transactions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.decimal("amount");
      table
        .integer("type_id")
        .unsigned()
        .references("id")
        .inTable("transaction_types")
        .onDelete("CASCADE");
      table.integer("account_id");
      table.integer("category_id");
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

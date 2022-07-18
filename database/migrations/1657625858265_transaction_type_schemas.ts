import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TransactionTypeSchemas extends BaseSchema {
  protected tableName = 'transaction_types'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("income")
      table.string("expense")
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

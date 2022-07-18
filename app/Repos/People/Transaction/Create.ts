import Transaction from "App/Models/People/Transaction";
import StoreValidator from "App/Validators/People/Transaction/StoreValidator";
import { Exception } from "@adonisjs/core/build/standalone";

export default class Create {
  async handle({
    amount,
    typeId,
    accountId,
    categoryId,
  }: typeof StoreValidator.parsedSchema.props) {
    let transaction;
    try {
      transaction = await Transaction.create({
        amount,
        typeId,
        categoryId,
        accountId,
      });
    } catch (error) {
      throw new Exception(error);
    }

    return transaction;
  }
}

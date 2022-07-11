import Transaction from "App/Models/People/Transaction";
import User from "App/Models/User";
import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
  hasManyThrough,
  HasManyThrough,
} from "@ioc:Adonis/Lucid/Orm";

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Relationships
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasManyThrough([() => Transaction, () => User])
  public transactions: HasManyThrough<typeof Transaction>;
}

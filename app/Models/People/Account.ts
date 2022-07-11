import Transaction from "App/Models/People/Transaction";
import { search } from "./../../Helpers/Model";
import User from "App/Models/User";
import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public accountUniqueId: string;

  @column()
  public userId: number;

  @column()
  public accountTypeId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relationships
   */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>;

  /**
   * Scopes
   */
  public static search = search(["name", "accountUniqueId"]);
}

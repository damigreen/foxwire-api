import Account from "App/Models/People/Account";
import User from "App/Models/User";
import { getRoleCodes } from "App/Helpers/index";
import { search } from "App/Helpers/Model";
import { DateTime } from "luxon";
import {
  column,
  BaseModel,
  scope,
  belongsTo,
  BelongsTo,
  // beforeSave,
  // hasOne,
  // HasOne,
  // manyToMany,
  // ManyToMany,
  // hasMany,
  // HasMany,
} from "@ioc:Adonis/Lucid/Orm";

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public amount: number;
  
  @column()
  public typeId: number;

  @column()
  public categoryId: number;

  @column()
  public accountId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relationships
   */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Account)
  public associatedAccount: BelongsTo<typeof Account>;

  /**
   * Scopes
   */
  public static byUser = scope((query, user?: User) => {
    const roleCodes = getRoleCodes(user);
    if (roleCodes.find((code) => code == "administrator")) return query;
    return query.where("id", user?.id || 0);
  });

  public static search = search(["name", "email", "phone", "username"]);
}

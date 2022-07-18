import { getRoleCodes } from "App/Helpers/index";
import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  scope,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
  hasManyThrough,
  HasManyThrough,
} from "@ioc:Adonis/Lucid/Orm";
import { search } from "App/Helpers/Model";
import Role from "App/Models/People/Role";
import Account from "App/Models/People/Account";
import Customer from "App/Models/People/Customer";
import Transaction from "App/Models/People/Transaction";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public gender: string;

  @column()
  public username: string;

  @column()
  public email: string;

  @column()
  public phone: string;

  @column()
  public active: boolean;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  /**
   * Relationships
   */
  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>;

  @hasMany(() => Account)
  public accounts: HasMany<typeof Account>;

  @hasOne(() => Customer)
  public customer: HasOne<typeof Customer>;

  @hasManyThrough([() => Transaction, () => Account])
  public transactions: HasManyThrough<typeof Transaction>;

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

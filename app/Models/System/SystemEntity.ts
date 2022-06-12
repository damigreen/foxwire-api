import SystemEventTrigger from "App/Models/System/SystemEventTrigger";
import {
  scope,
  BaseModel,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import SystemEntityParam from "App/Models/System/SystemEntityParam";
import User from "App/Models/User";
import { getRoleCodes } from "App/Helpers";

export default class SystemEntity extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public namespace: string;

  @column()
  public code: string;

  @column()
  public tablename: string;

  @column()
  public description: string;

  @column()
  public interactive: boolean;

  // Relationships
  @hasMany(() => SystemEntityParam)
  public params: HasMany<typeof SystemEntityParam>;

  // Relationships
  @hasMany(() => SystemEventTrigger)
  public eventTriggers: HasMany<typeof SystemEventTrigger>;

  // Scopes
  public static byUser = scope((query, user?: User) => {
    const roleCodes = getRoleCodes(user);
    if (roleCodes.find((code) => code == "administrator")) return query;
    return query.where("id", user?.id || 0);
  });
}

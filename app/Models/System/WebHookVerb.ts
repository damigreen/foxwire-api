import {
  scope,
  BaseModel,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import WebHook from "App/Models/System/WebHook";
import { getRoleCodes } from "App/Helpers";

export default class WebHookVerb extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public code: string;

  // Relationships
  @hasMany(() => WebHook)
  public webHooks: HasMany<typeof WebHook>;

  // Scopes
  public static byUser = scope((query, user?: User) => {
    const roleCodes = getRoleCodes(user);
    if (roleCodes.find((code) => code == "administrator")) return query;
    return query.where("id", user?.id || 0);
  });
}

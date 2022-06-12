import { DateTime } from "luxon";
import {
  scope,
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import WebHook from "App/Models/System/WebHook";
import { getRoleCodes } from "App/Helpers";

export default class WebHookHeader extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public value: string;

  @column()
  public accountId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public deletedAt: DateTime;

  @manyToMany(() => WebHook)
  public webHooks: ManyToMany<typeof WebHook>;

  // Scopes
  public static byUser = scope((query, user?: User) => {
    const roleCodes = getRoleCodes(user);
    if (roleCodes.find((code) => code == "administrator")) return query;
    return query.where("id", user?.id || 0);
  });
}

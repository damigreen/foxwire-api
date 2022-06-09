import {
  scope,
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

import { getRoleCodes } from "App/Helpers/index";

import User from "App/Models/User";
import Account from "App/Models/People/Account";
import WebHookVerb from "App/Models/System/WebHookVerb";
import WebHookHeader from "App/Models/System/WebHookHeader";
import WebHookParam from "App/Models/System/WebHookParam";
import SystemEvent from "App/Models/System/SystemEvent";

export default class WebHook extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public url: string;

  @column()
  public accountId: number;

  @column()
  public systemEntityId: number;

  @column()
  public webHookVerbId: number;

  @column()
  public basicAuthUsername: string;

  @column()
  public basicAuthPassword: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public deletedAt: DateTime;

  // Relationships
  @belongsTo(() => WebHookVerb)
  public verb: BelongsTo<typeof WebHookVerb>;

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>;

  @manyToMany(() => WebHookHeader)
  public headers: ManyToMany<typeof WebHookHeader>;

  @hasMany(() => WebHookParam)
  public params: HasMany<typeof WebHookParam>;

  @manyToMany(() => SystemEvent)
  public events: ManyToMany<typeof SystemEvent>;

  // Scopes
  public static byUser = scope((query, user?: User) => {
    const roleCodes = getRoleCodes(user);
    if (roleCodes.find((code) => code == "administrator")) return query;
    return query.where("id", user?.id || 0);
  });
}

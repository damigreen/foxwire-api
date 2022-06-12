import {
  scope,
  BaseModel,
  column,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
} from "@ioc:Adonis/Lucid/Orm";
import SystemEntity from "App/Models/System/SystemEntity";
import SystemEvent from "App/Models/System/SystemEvent";
import User from "App/Models/User";
import { getRoleCodes } from "App/Helpers";

export default class SystemEventTrigger extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public code: string;

  @column()
  public description: string;

  @column()
  public SystemEntityId: number;

  @hasMany(() => SystemEvent)
  public events: HasMany<typeof SystemEvent>;

  @belongsTo(() => SystemEntity)
  public entity: BelongsTo<typeof SystemEntity>;

  // Scopes
  public static byUser = scope((query, user?: User) => {
    const roleCodes = getRoleCodes(user);
    if (roleCodes.find((code) => code == "administrator")) return query;
    return query.where("id", user?.id || 0);
  });
}

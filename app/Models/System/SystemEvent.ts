import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";

import SystemEventTrigger from "App/Models/System/SystemEventTrigger";
import WebHook from "App/Models/System/WebHook";
import SystemAlert from "App/Models/System/SystemAlert";

export default class SystemEvent extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public accountId: number;

  @column()
  public SystemEntityId: number;

  @column()
  public systemEventTriggerId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public deletedAt: DateTime;

  // Relationships
  @belongsTo(() => SystemEventTrigger)
  public trigger: BelongsTo<typeof SystemEventTrigger>;

  // Relationships
  @manyToMany(() => SystemAlert)
  public alerts: ManyToMany<typeof SystemAlert>;

  @manyToMany(() => WebHook)
  public hooks: ManyToMany<typeof WebHook>;
}

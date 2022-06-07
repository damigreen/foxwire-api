import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import SystemEntity from 'App/Models/System/SystemEntity';
import SystemEvent from 'App/Models/System/SystemEvent';

export default class SystemEventTrigger extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @column()
  public description: string

  @column()
  public SystemEntityId: number

  @hasMany(() => SystemEvent)
  public events: HasMany<typeof SystemEvent>

  @belongsTo(() => SystemEntity)
  public entity: BelongsTo<typeof SystemEntity>
}

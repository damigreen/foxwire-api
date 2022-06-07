import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import SystemEntity from 'App/Models/System/SystemEntity';

export default class SystemEntityParam extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public propertyName: string

  @column()
  public systemEntityId: number


  // Relationships
  @belongsTo(() => SystemEntity)
  public systemEntity: BelongsTo<typeof SystemEntity>
}

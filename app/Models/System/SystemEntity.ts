import SystemEventTrigger from 'App/Models/System/SystemEventTrigger';
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import SystemEntityParam from 'App/Models/System/SystemEntityParam'

export default class SystemEntity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public namespace: string

  @column()
  public code: string

  @column()
  public tablename: string

  @column()
  public description: string

  @column()
  public interactive: boolean

  // Relationships
  @hasMany(() => SystemEntityParam)
  public params: HasMany<typeof SystemEntityParam>

  // Relationships
  @hasMany(() => SystemEventTrigger)
  public eventTriggers: HasMany<typeof SystemEventTrigger>
}

import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import WebHook from 'App/Models/System/WebHook'

export default class WebHookVerb extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  // Relationships
  @hasMany(() => WebHook)
  public webHooks: HasMany<typeof WebHook>
}

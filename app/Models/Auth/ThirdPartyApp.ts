import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ThirdPartyApp extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name?: string

  @column()
  public code?: string

  @column()
  public active?: boolean

  @column()
  public interactive?: boolean
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ThirdPartyToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public token?: string
  
  @column()
  public refreshToken?: string

  @column()
  public tokenExpiresAt?: number

  @column()
  public refreshTokenExpiresAt?: number

  @column()
  public thirdPartyAppId?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { search } from './../../Helpers/Model';
import User from 'App/Models/User';
import { DateTime } from 'luxon'
import { scope, BaseModel, column, manyToMany, ManyToMany, hasOne, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public accountUniqueId: string

  @column()
  public userId: number

  @column()
  public accountTypeId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
 * Relationships
 */
@belongsTo(() => User)
public user: BelongsTo<typeof User>


/**
* Scopes
*/
  public static search = search(["name", "accountUniqueId"])

  // public static byUser = scope((query, ) => {

  // })
}

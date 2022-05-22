import { scope, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { search } from 'App/Helpers/Model';
import Role from './People/Role';


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public gender: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public active: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  /**
   * Relationships
   */
   @manyToMany(() => Role)
   public roles: ManyToMany<typeof Role>

  
  /**
   * Scopes
   */
  public static byUser = scope((query) => {
    // console.log(true);
    // console.log(search(['Damilola Faseun']));
  })

  public static search = search(["name", "email", "phone", "username"])
}

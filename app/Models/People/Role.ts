import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import SystemFunction from '../System/SystemFunction';

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @column()
  public description: string

  @column()
  public active: boolean

  // Relationships
  @manyToMany(() => User, { pivotTable: 'user_role' })
  public users: ManyToMany<typeof User>

  @manyToMany(() => SystemFunction, { pivotTable: 'system_function_role' })
  public functions: ManyToMany<typeof SystemFunction>
}

import { BaseModel, column, manyToMany, ManyToMany, } from '@ioc:Adonis/Lucid/Orm'
import Role from 'App/Models/People/Role'

export default class SystemFunction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @column()
  public description: string

  @column()
  public systemEntityId: number

  // Relationships
  @manyToMany(() => Role, { pivotTable: 'system_function_role' })
  public roles: ManyToMany<typeof Role>
}

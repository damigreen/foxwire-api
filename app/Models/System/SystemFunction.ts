import {
  scope,
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { getRoleCodes } from "App/Helpers";
import Role from "App/Models/People/Role";
import User from "App/Models/User";

export default class SystemFunction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public code: string;

  @column()
  public description: string;

  @column()
  public systemEntityId: number;

  // Relationships
  @manyToMany(() => Role, { pivotTable: "system_function_role" })
  public roles: ManyToMany<typeof Role>;

  // Scopes
  public static byUser = scope((query, user?: User) => {
    const roleCodes = getRoleCodes(user);
    if (roleCodes.find((code) => code == "administrator")) return query;
    return query.where("id", user?.id || 0);
  });
}

import { schema } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

const schemaToCreate = {
  name: schema.string(),
  url: schema.string(),
  accountId: schema.number(),
  systemEntityId: schema.number(),
  webHookVerbId: schema.number.optional(),
  basicAuthUsername: schema.string.optional(),
  basicAuthPassword: schema.string.optional(),
  systemEventTriggerId: schema.number(),
  header_name: schema.array.optional().members(schema.string()),
  header_value: schema.array.optional().members(schema.string()),
  system_entity_param_id: schema.array.optional().members(schema.number()),
  param_name: schema.array.optional().members(schema.string()),
};

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create(schemaToCreate);

  public static parsedSchema = schema.create(schemaToCreate);

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {};
}

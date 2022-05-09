import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { TypedSchema, ParsedTypedSchema, Schema, Rules } from "@ioc:Adonis/Core/Validator"

export default interface CtxExtendContract extends HttpContextContract {
    validator: {
        rules: Rules;
        schema: Schema;
        validate<T extends TypedSchema>(schema: T): Promise<ParsedTypedSchema<T>["props"]>
    }
}
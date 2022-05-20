import type { EventsList } from '@ioc:Adonis/Core/Event'
import { webAppUrl } from '../../../config/app';
import mailConfig from 'Config/mail';
import Mail from '@ioc:Adonis/Addons/Mail';


export default class VerifyEmail {
    public async handle({ user, resetCode, type }: EventsList["password/reset-code-generated"]) {
        await Mail.send(message => {
            message
                .from(mailConfig.sender)
                .to("fashfired@gmail.com")
                .subject("Welcome to Foxwire")
                .htmlView("emails/people/welcome", { user, resetCode, webAppUrl })
        })
    }
}

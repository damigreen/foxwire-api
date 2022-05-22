import type { EventsList } from '@ioc:Adonis/Core/Event'
import { webAppUrl } from '../../../config/app';
import mailConfig from 'Config/mail';
import Mail from '@ioc:Adonis/Addons/Mail';


export default class VerifyEmail {
    public async handle({ user }: EventsList["email/verify-email"]) {
        await Mail.send(message => {
            message
                .from(mailConfig.sender)
                .to("fashfired@gmail.com")
                .subject("Email Verification")
                .htmlView("emails/auth/verify-email", { user, webAppUrl })
        })
    }
}

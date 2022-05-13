import type { EventsList } from '@ioc:Adonis/Core/Event'
import Mail from "@ioc:Adonis/Addons/Mail";
import mailConfig from 'Config/mail';
import { webAppUrl } from 'Config/app';

export default class SendWelcomeMail {
    async handle({ user }: EventsList["user/created"]) {
        await Mail.send(message => {
            message
                .from(mailConfig.sender)
                .to("fashfired@gmail.com")
                .subject("Welcome to Foxwire")
                .htmlView("emails/people/welcome", { user, webAppUrl })
        })
    }
}

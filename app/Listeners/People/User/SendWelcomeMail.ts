import type { EventsList } from '@ioc:Adonis/Core/Event'
import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env"
// import mailConfig from 'Config/mail';

export default class SendWelcomeMail {
    async handle({ user }: EventsList["user/created"]) {
        await Mail.send(message => {
            message
                .from(Env.get("MAIL_FROM"))
                // .to(user.email)
                .to("fashfired@gmail.com")
                .subject("Welcome to Foxwire")
                .htmlView("email/people/welcome", {user, webAppUrl})
        })
    }
}

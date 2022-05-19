import type { EventsList } from '@ioc:Adonis/Core/Event'
import { webAppUrl } from './../../../config/app';
import mailConfig from 'Config/mail';
import Mail from '@ioc:Adonis/Addons/Mail';


export default class SendResetCode {
    /**
* [ ] create email verification logica
  * [ ] register new event listner on the events file
  * [ ] send user, reset_code, type as a parameter to event listener
  * [ ] write email template
  * [ ] send email logic
 */
    public async handle({ user, resetCode, type }: EventsList["password/reset-code-generated"]) {
        console.log("user, resetCode, type");
        console.log(type);

        await Mail.send(message => {
            message
                .from(mailConfig.sender)
                .to("fashfired@gmail.com")
                .subject("Welcome to Foxwire")
                .htmlView("emails/people/welcome", { user, webAppUrl })
        })
    }
}

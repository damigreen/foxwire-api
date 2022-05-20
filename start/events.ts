import Event from '@ioc:Adonis/Core/Event';
/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

/**
 * Auth
 */
Event.on("password/reset-code-generated", 'Auth/SendResetCode')
Event.on("email/verify-email", 'Auth/VerifyEmail')

/**
 * People
 */
Event.on("user/created", 'People/User/SendWelcomeMail')


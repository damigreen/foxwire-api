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

// ['Auth/SendResetCode'].forEach(listener => {
//     Event.on("password/reset-code-generated", listener)
// })
// ['People/User/SendWelcomeMail'].forEach(listener => {
//     Event.on("user/created", listener)
// })

Event.on("user/created", 'People/User/SendWelcomeMail')
Event.on("password/reset-code-generated", 'Auth/SendResetCode')


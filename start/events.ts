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

["People/User/SendWelcomeMail"].forEach(listener => {
    Event.on("user/created", listener)
})
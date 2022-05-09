/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  view.render("view/email/people/welcome", { user: { email: "fashfired@gmail.com", phone: "07061935742" } })
  // console.log(
  //   true
  // );
  return { message: 'God is good' }
})

Route.group(() => {
  Route.post('oauth/login', 'OAuthsController.login')
  Route.post('oauth/logout', 'OAuthsController.logout')
  // Route.post('password-change', 'PasswordChangeController').middleware(['auth'])
})
  .namespace("App/Controllers/Http/Auth")

/**
 * People
 */
Route.group(() => {
  Route.resource("users", "UsersController").apiOnly()
})
  .namespace("App/Controllers/Http/People")

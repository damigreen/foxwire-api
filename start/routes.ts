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



/**
 * Auth
 */
Route.group(() => {
  Route.get("/", "OAuthsController.index")
  Route.get("/login", "OAuthsController.redirect")
  Route.post('oauth/login', 'OAuthsController.login')
  Route.post('oauth/logout', 'OAuthsController.logout').middleware(["auth"])
  Route.post("password/send-reset-code", "PasswordsController.sendCode")
})
  .namespace("App/Controllers/Http/Auth")

/**
 * People
 */
Route.group(() => {
  Route.resource("users", "UsersController").apiOnly()
  Route.resource("roles", "RolesController").only(["index"])
})
  .namespace("App/Controllers/Http/People")
  .middleware(['auth'])

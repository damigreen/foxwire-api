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

import Route from "@ioc:Adonis/Core/Route";

// Auth
Route.group(() => {
  Route.get("/", "OAuthsController.index");
  Route.get("/login", "OAuthsController.redirect");
  Route.post("oauth/login", "OAuthsController.login");
  Route.post("oauth/logout", "OAuthsController.logout").middleware(["auth"]);
  Route.post("password/send-reset-code", "PasswordsController.sendCode");
  Route.post("password/verify-and-reset", "PasswordsController.verifyAndReset");
  Route.post("password/change/", "PasswordsController.change");
  Route.get("email/verify/:id", "EmailsController.verify");
}).namespace("App/Controllers/Http/Auth");

// People
Route.group(() => {
  Route.resource("users", "UsersController").apiOnly();
  Route.resource("roles", "RolesController").only(["index"]);
  Route.resource("accounts", "AccountsController");
  Route.post("accounts/change-name", "AccountsController.changeName");
  Route.resource("customers", "CustomersController");
})
  .namespace("App/Controllers/Http/People")
  .middleware(["auth"]);

Route.group(() => {
  Route.resource("web-hooks", "WebHooksController").apiOnly();
  Route.resource("web-hook-headers", "WebHookHeadersController").apiOnly();
  Route.resource("web-hook-verbs", "WebHookVerbsController").apiOnly();
  Route.resource("system-entities", "SystemEntitiesController").apiOnly();
  Route.resource("system-functions", "SystemFunctionController").apiOnly();
  Route.resource("system-event-triggers", "SystemEventTriggerController").apiOnly();
})
  .namespace("App/Controllers/Http/System")
  .middleware(["auth"]);

// // WebHooks
// Route.post(
//   "/client-request/move-to-scoping",
//   "WebHooksController.moveToScoping"
// );
// Route.post("/request/approved", "WebHooksController.approve");
// Route.post("/request/completed", "WebHooksController.completed");
// Route.post("/request/started", "WebHooksController.started");

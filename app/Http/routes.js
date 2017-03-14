'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.group('api',function () {
  
  // Auth
  Route.post('login', 'api/UserController.login')

  // Admin
  Route.delete('products/:id', 'api/ProductController.destroy').middleware('admin')
  Route.post('products', 'api/ProductController.store').middleware('admin')
  Route.put('products/:id', 'api/ProductController.update').middleware('admin')

  // Logged users only
  Route.post('likes', 'api/LikeController.store').middleware('logged')
  Route.post('purchases', 'api/PurchaseController.store').middleware('logged')

  // Product index
  //Route.get('products', 'api/ProductController.index')

  // Resourceful
  Route.resource('products', 'api/ProductController')
  Route.resource('purchases', 'api/PurchaseController')
  Route.resource('users', 'api/UserController')

}).prefix('/api/v1')//.middleware('auth:basic')

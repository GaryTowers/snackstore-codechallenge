'use strict'

const Hash = use('Hash')
const User = use('App/Model/User')

class UserController {

  * index(request, response) {
    //
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    const user    = new User()
    // TODO validate required email and password
    user.email    = request.input('email')
    user.password = request.input('password')
    user.is_admin = request.input('is_admin', false)
    yield user.save()
    const token = yield request.auth.generate(user)
    response.ok({
      'user' : user,
      'token': token
    })
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      response.unauthorized({error: 'Your must be logged-in to access this resource.'})
    }
    const user    = yield request.auth.getUser()
    user.email    = request.input('email', user.email)
    user.is_admin = request.input('is_admin', user.is_admin)
    yield user.save()
    response.ok(user)
  }

  * destroy(request, response) {
    //
  }

  * login(request, response) {
    const user = yield User.findBy('email', request.input('email'))
    if (user) {
      const isSame = yield Hash.verify(request.input('password'), user.password)
      if (isSame) {
        const token = yield request.auth.generate(user)
        response.ok(token)
      } else {
        response.unauthorized('Wrong password')
      }
    } else {
      response.notFound('Email not found')
    }
  }
}

module.exports = UserController

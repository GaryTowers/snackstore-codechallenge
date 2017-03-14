'use strict'

class AdminLoggedIn {

  * handle (request, response, next) {
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      response.unauthorized({error: 'Your must be logged-in to access this resource.'})
    }
    const user = yield request.auth.getUser()
    if (user.is_admin) {
      yield next
    }
    response.unauthorized({error: 'Your need to be an admin to access this resource.'})
  }

}

module.exports = AdminLoggedIn

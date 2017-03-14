'use strict'

class LoggedIn {

  * handle (request, response, next) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      response.unauthorized({error: 'Your must be logged-in to access this resource.'})
    }
    const user = yield request.auth.getUser()
    request.userId = user.id
    yield next
  }

}

module.exports = LoggedIn

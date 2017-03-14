'use strict'

class LoggedIn {

  * handle (request, response, next) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      response.unauthorized({error: 'Your must be logged-in to access this resource.'})
    }
    yield next
  }

}

module.exports = LoggedIn

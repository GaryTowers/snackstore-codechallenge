'use strict'

const Product = use('App/Model/Product')
const User    = use('App/Model/User')

class LikeController {

  * index(request, response) {
    //
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    const userId        = request.userId
    const user          = yield User.find(userId)
    const inputProducts = request.input('products')
    const now           = new Date()
    if (inputProducts.length > 0) {
      for (let i = inputProducts.length - 1; i >= 0; i--) {
        const product = yield Product.find(inputProducts[i])
        if (product) {
          try {
            yield user.likes().attach([product.id], { created_at: now, updated_at: now })
          } catch (err) {
            // ignore duplicate entries, i.e. product already liked
          }
        }
      }
      response.ok('Product(s) liked')
    } else {
      response.notFound({error: 'Please include at least one product to like'})
    }
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = LikeController

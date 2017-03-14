'use strict'

const Database       = use('Database')
const Product        = use('App/Model/Product')
const Purchase       = use('App/Model/Purchase')
const PurchaseDetail = use('App/Model/PurchaseDetail')

class PurchaseController {

  * index(request, response) {
    //
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (!isLoggedIn) {
      response.unauthorized({error: 'Your must be logged-in to access this resource.'})
    }
    // get user from jwt header
    const user = yield request.auth.getUser()

    // it's better to have separate arrays for amounts and ids from the request, so eager loading is much easier on this side
    // TODO learn or write a function to get a collection of models from an array of ids
    // if above is possible, process should be:
    /*
    1. fetch all products in 2 SQL queries to a collection of models
    2. iterate collection
      2.1 reduce stock
      2.2 create purchase detail
      2.3 assign product_id
      2.4 assign quantity
      2.5 add to detail array
    3. associate detail array to purchase
     */

    const inputProducts = request.input('products')
    if (inputProducts) {
      const purchase = new Purchase()
      yield user.purchases().saveMany([purchase])
      let details = []
      for (let i = inputProducts.length - 1; i >= 0; i--) {
        const inputProduct = yield Product.find(inputProducts[i]['id'])
        if (inputProduct) {
          inputProduct.stock -= inputProducts[i]['amount']
          yield inputProduct.save()
          const detail = yield PurchaseDetail.create({
            quantity: inputProducts[i]['amount']
          })
          yield inputProduct.sales().saveMany([detail])
          details.push(detail)
        }
      }
      yield purchase.details().saveMany(details)
      response.ok(purchase)
    } else {
      response.notFound({error: 'Please include at least one product to create a purchase'})
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

module.exports = PurchaseController

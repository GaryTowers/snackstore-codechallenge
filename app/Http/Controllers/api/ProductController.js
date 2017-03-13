'use strict'

const Product = use('App/Model/Product')

class ProductController {

  * index(request, response) {
    const products = yield Product.all()
    response.ok(products)
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    const product       = new Product()
    // TODO validate required name, stock and price
    product.name        = request.input('name')
    product.description = request.input('description', null)
    product.stock       = request.input('stock')
    product.price       = request.input('price')
    yield product.save()
    response.ok(product)
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    const productId = request.param('id')
    const product   = yield Product.find(productId)
    if (product) {
      product.name        = request.input('name', product.name)
      product.description = request.input('description', product.description)
      product.stock       = request.input('stock', product.stock)
      product.price       = request.input('price', product.price)
      yield product.save()
      response.ok(product)
    } else {
      response.notFound({"error": "Product not found"})
    }
  }

  * destroy(request, response) {
    const productId = request.param('id')
    const product = yield Product.find(productId)
    yield product.delete()
    response.ok('Product was deleted')
  }

}

module.exports = ProductController

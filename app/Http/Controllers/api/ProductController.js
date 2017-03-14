'use strict'

const Product = use('App/Model/Product')

class ProductController {

  * index(request, response) {
    const page    = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    const query   = request.input('q')
    if (query) {
      const products = yield Product.query().where('name', query).fetch()
      response.ok(products)
    } else {
      const products = yield Product.paginate(page, perPage)
      response.ok(products)
    }

    // TODO sort by name and then by popularity and keep pagination

    // var _ = require('lodash')
    //_.sortBy(products, [function (o) { return o.name }])

    // const products = yield Product.query().orderBy('name', 'asc').fetch()
    // var paginatedProducts = products.slice(offset * get, (offset + 1) * get)
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
    if (product) {
      yield product.delete()
      response.ok('Product was deleted')
    }
    response.notFound('Product was not found')
  }

}

module.exports = ProductController

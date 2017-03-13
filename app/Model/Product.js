'use strict'

const Lucid = use('Lucid')

class Product extends Lucid {

  static get deleteTimestamp () {
    return 'deleted_at'
  }
}

module.exports = Product

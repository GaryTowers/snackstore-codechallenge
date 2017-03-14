'use strict'

const Lucid = use('Lucid')

class Product extends Lucid {

  static get deleteTimestamp () {
    return 'deleted_at'
  }

  likedByUsers () {
    return this.belongsToMany('App/Model/User', 'likes', 'product_id', 'user_id')
  }

  sales () {
    return this.hasMany('App/Model/PurchaseDetail')
  }
}

module.exports = Product

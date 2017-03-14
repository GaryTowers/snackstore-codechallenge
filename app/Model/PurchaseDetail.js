'use strict'

const Lucid = use('Lucid')

class PurchaseDetail extends Lucid {

  static get table () {
    return 'purchase_detail'
  }

  static get deleteTimestamp () {
    return 'deleted_at'
  }

  product () {
    return this.belongsTo('App/Model/Product')
  }

  purchase () {
    return this.belongsTo('App/Model/Purchase')
  }
}

module.exports = PurchaseDetail

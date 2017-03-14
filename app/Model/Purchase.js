'use strict'

const Lucid = use('Lucid')

class Purchase extends Lucid {

  static get deleteTimestamp () {
    return 'deleted_at'
  }

  details () {
    return this.hasMany('App/Model/PurchaseDetail')
  }

  user() {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Purchase

'use strict'

const Schema = use('Schema')

class PurchaseDetailTableSchema extends Schema {

  up () {
    this.create('purchase_detail', (table) => {
      table.increments()
      table.integer('quantity')
      table.integer('product_id')
      table.integer('purchase_id')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('purchase_detail')
  }

}

module.exports = PurchaseDetailTableSchema

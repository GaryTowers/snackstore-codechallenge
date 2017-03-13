'use strict'

const Schema = use('Schema')

class PurchasesTableSchema extends Schema {

  up () {
    this.create('purchases', (table) => {
      table.increments()
      table.integer('user_id')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('purchases')
  }

}

module.exports = PurchasesTableSchema

'use strict'

const Schema = use('Schema')

class ProductsTableSchema extends Schema {

  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.integer('stock')
      table.decimal('price')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('products')
  }

}

module.exports = ProductsTableSchema

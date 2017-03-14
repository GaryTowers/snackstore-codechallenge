'use strict'

const Schema = use('Schema')

class AuditProductsTableSchema extends Schema {

  up () {
    this.create('audit_products', (table) => {
      table.increments()
      table.decimal('price')
      table.integer('product_id')
      table.timestamp('changed_at')
    })
  }

  down () {
    this.drop('audit_products')
  }

}

module.exports = AuditProductsTableSchema

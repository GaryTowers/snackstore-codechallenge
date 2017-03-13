'use strict'

const Schema = use('Schema')

class AuditProductsTableSchema extends Schema {

  up () {
    this.create('audit_products', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.decimal('price')
      table.integer('product_id')
      table.timestamp('started_at')
      table.timestamp('ended_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('audit_products')
  }

}

module.exports = AuditProductsTableSchema

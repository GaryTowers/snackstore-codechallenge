'use strict'

const Schema = use('Schema')

class LikesTableSchema extends Schema {

  up () {
    this.create('likes', (table) => {
      table.integer('user_id')
      table.integer('product_id')
      table.primary(['user_id', 'product_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('likes')
  }

}

module.exports = LikesTableSchema

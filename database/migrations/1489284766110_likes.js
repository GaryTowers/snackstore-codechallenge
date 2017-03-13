'use strict'

const Schema = use('Schema')

class LikesTableSchema extends Schema {

  up () {
    this.create('likes', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('product_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('likes')
  }

}

module.exports = LikesTableSchema

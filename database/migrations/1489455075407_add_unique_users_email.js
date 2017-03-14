'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.string('email').unique().alter()
    })
  }

  down () {
    this.table('users', (table) => {
      table.string('email').alter()
    })
  }

}

module.exports = UsersTableSchema

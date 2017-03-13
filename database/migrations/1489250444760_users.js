'use strict';

const Schema = use('Schema');

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email')
      table.string('password')
      table.boolean('is_admin')
      table.timestamps()
      table.softDeletes()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema

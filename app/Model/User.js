'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'User.encryptPassword')
  }

  static get deleteTimestamp () {
    return 'deleted_at'
  }

  likes() {
    return this.belongsToMany('App/Model/Product', 'likes', 'user_id', 'product_id')
  }

  purchases () {
    return this.hasMany('App/Model/Purchase')
  }
}

module.exports = User

const Database = require('../database/datastore')

class UserServices {
  static async getAllUsers () {
    await Database.createConnection()
    const query = 'SELECT * FROM users'
    const users = await Database.query(query)
    await Database.close()
    return users[0]
  };

  static async insertUserToDatabase (name, email, password) {
    await Database.createConnection()
    const query = {
      sql: 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      values: [name, email, password]
    }

    const user = await Database.query(query)
    await Database.close()
    return user
  }

  static async getUserFromEmail (email) {
    await Database.createConnection()
    const query = {
      sql: 'SELECT * FROM users WHERE email= ? ',
      values: [email]
    }
    const user = await Database.query(query)
    await Database.close()
    return user[0][0]
  }
}

module.exports = UserServices
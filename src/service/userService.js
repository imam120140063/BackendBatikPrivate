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

  static async getUserById (id) {
    await Database.createConnection()
    const query = {
      sql: 'SELECT * FROM users WHERE id = ? ',
      values: [id]
    }
    const user = await Database.query(query)
    await Database.close()
    return user[0][0]
  }

  static async updateUser (id, name, username, image) {
    await Database.createConnection()
    const query = {
      sql: 'UPDATE users SET name = ?, username = ?, image = ?, updated_at = ? WHERE id = ?',
      values: [name, username, image, new Date(), id]
    }
    const user = await Database.query(query)
    await Database.close()
    return user
  }

  static async updateUserLevelByID (id, level) {
    await Database.createConnection()
    const query = {
      sql: 'UPDATE users SET idlevel = GREATEST(idlevel, ?) WHERE id = ?',
      values: [level, id]
    }
    const user = await Database.query(query)
    await Database.close()
    return user
  }

  static async addUserExpByID (id, exp) {
    await Database.createConnection()
    const query = {
      sql: 'UPDATE users SET exp = exp + ? WHERE id = ?',
      values: [exp, id]
    }
    const user = await Database.query(query)
    await Database.close()
    return user
  }
}

module.exports = UserServices
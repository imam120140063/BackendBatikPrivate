const mysql = require('mysql2/promise')

class Database {
  static async createConnection () {
    this.connection = await mysql.createConnection({
      host: process.env.db_host,
      user: process.env.db_user,
      password: process.env.db_password,
      database: process.env.db_database,
      port: process.env.db_port,
      multipleStatements: true
    })
  }

  static async query (sql) {
    return await this.connection.execute(sql)
  }

  static async close () {
    return await this.connection.end()
  }
}

module.exports = Database
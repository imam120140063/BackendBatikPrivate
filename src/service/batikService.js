const Database = require('../database/datastore')

class batikServices{
    static async getAllBatiks () {
        await Database.createConnection()
        const query = 'SELECT * FROM batiks'
        const batik = await Database.query(query)
        await Database.close()
        return batik[0]
    }
    static async getBatiksById (id){
        await Database.createConnection()
        const query = {
        sql: 'SELECT * FROM batiks WHERE id = ? ',
        values:[id]
        }
        const batik = await Database.query(query)
        await Database.close()
        return batik[0][0]
    }
}

module.exports = batikServices
const Database = require('../database/datastore')

class wishlistServices{
    static async getAllWish (id) {
        await Database.createConnection()
        const query = {
        sql : 'select id, title, photourl, price, description, rating from batiks join wishlist on batiks.id = wishlist.batik_id WHERE user_id = ?',
        values : [id]
        }
        const wish = await Database.query(query)
        await Database.close()
        return wish[0]
    }
    static async checkWislistById(user_id, batik_id){
        await Database.createConnection()
        const query = {
        sql : 'select id, title, photourl, price, description, rating from batiks join wishlist on batiks.id = wishlist.batik_id WHERE user_id = ? and batiks.id = ?',
        values : [user_id, batik_id]
        }
        const wish = await Database.query(query)
        await Database.close()
        return wish[0]
    }
    static async insertWishlist (user_id, batik_id){
        await Database.createConnection()
        const query = {
        sql : 'insert into wishlist (user_id, batik_id) values (?, ?)',
        values : [user_id, batik_id]
        }
        const wish = await Database.query(query)
        await Database.close()
        return wish[0]
    }
    static async deleteWishlist (user_id, batik_id){
        await Database.createConnection()
        const query = {
        sql : 'delete from wishlist WHERE user_id = ? and batik_id = ?',
        values : [user_id, batik_id]
        }
        const wish = await Database.query(query)
        await Database.close()
    }
}

module.exports = wishlistServices
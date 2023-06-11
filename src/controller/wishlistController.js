const wishlistServices = require('../service/wishlistService')
const jwt = require('jsonwebtoken')

class wishlistController {
    static async getAllWish(req, res) {
        try{
        const token = req.headers.authorization

        if (!token) throw new Error('Error while getting token')

        const jwtToken = token.replace('Bearer ', '')
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_TOKEN)
        const userId = decodedToken.id

        if (!userId) throw new Error('Error while getting userId')

        const wish = await wishlistServices.getAllWish(userId)

        if (!wish) throw new Error('Error while getting batiks')
        if (Object.keys(wish).length === 0 ) throw new Error('Error Data is not exist')

        const response = {
            status : 200, 
            message : 'Wishlist retrieved successfully', 
            data : wish,
        }
        return res.status(200).send(response)
        } catch (err) {
        const message = err.message.replace(/['"]+/g, '')

        const response = {
            status : 400, 
            message : message,
        }

        return res.status(400).send(response)
        }
    }


    static async insertWishlist(req, res){
        try{
            const token = req.headers.authorization
            
            if (!token) throw new Error('Error while getting headers')
        

            const jwtToken = token.replace('Bearer ', '')
            const decodedToken = jwt.verify(jwtToken, process.env.JWT_TOKEN)
            const userId = decodedToken.id


            const wish = await wishlistServices.insertWishlist(userId, req.params.id)
            const response = {
                    status : 201, 
                    message : 'Inserted Wishlist successfully', 
                    data : wish,
                }

            return res.status(201).send(response)
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')

            const response = {
            status : 400, 
            message : message,
        }

            return res.status(400).send(response)

        }
    }
    static async deleteWishlist(req, res){
        try{
            const token = req.headers.authorization
            
            if (!token) throw new Error('Error while getting headers')
        

            const jwtToken = token.replace('Bearer ', '')
            const decodedToken = jwt.verify(jwtToken, process.env.JWT_TOKEN)
            const userId = decodedToken.id

            await wishlistServices.deleteWishlist(userId, req.params.id)
            const response = {
                    status : 200, 
                    message : 'Deleted Wishlist successfully',
                }
            return res.status(200).send(response)
        }catch(err){
            const message = err.message.replace(/['"]+/g, '')

            const response = {
            status : 400, 
            message : message,
        }

            return res.status(400).send(response)

        }
    }
}

module.exports = wishlistController
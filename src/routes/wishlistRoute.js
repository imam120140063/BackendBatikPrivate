const express = require('express')
const wishlist = require('../controller/wishlistController')

const routes = express.Router()

routes.get('/wishlist/:id', wishlist.getAllWish)
routes.post('/wishlist/:id', wishlist.insertWishlist)
routes.delete('/wishlist/:id', wishlist.deleteWishlist)

module.exports = routes
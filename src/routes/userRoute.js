const express = require('express')
const user = require('../controller/userController')

const routes=express.Router()

routes.post('/register',user.register)
routes.post('/login',user.login)

module.exports = routes
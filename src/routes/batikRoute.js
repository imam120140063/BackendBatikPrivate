const express = require('express')
const batik = require('../controller/batikController')

const routes = express.Router()

routes.get('/batik', batik.getAllBatiks)
routes.get('/batik/:id', batik.getBatiksById)

module.exports = routes
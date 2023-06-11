const express = require('express')
const cors = require('cors')

require("dotenv").config()

const user = require('./src/routes/userRoute')
const batik = require('./src/routes/batikRoute')
const wishlist = require('./src/routes/wishlistRoute')

const app = express()

app.get("/", (_, res) => {
  res.send({
    message: "Welcome",
  })
})

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.use(cors())

app.use(user)
app.use(batik)
app.use(wishlist)


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`)
})
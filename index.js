const express = require("express")
const cors = require("cors")
//const { Datastore } = require("@google-cloud/datastore");

require("dotenv").config()

const user = require('./src/routes/userRoute')

/*const datastore = new Datastore({
  projectId: process.env.GCP_ID,
  keyFilename: process.env.datastore_key,
});*/

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

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`)
})
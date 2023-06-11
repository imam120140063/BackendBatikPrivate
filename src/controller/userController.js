const UserServices = require('../service/userService')
const jwt = require('jsonwebtoken')

class userController{
  static async register(req, res){
    const payload = req.body
    try {
      //check if email already used
      const user = await UserServices.getUserFromEmail(payload.email)
      if (user) throw new Error('Username already exist')

      //inputting data to database
      const insertUser = await UserServices.insertUserToDatabase(payload.name, payload.email, payload.password)

      //check if input to database succes
      if (!insertUser) throw new Error('Error while register user')

      const response = {
          status : 201, 
          message : 'User Created',
      }
      return res.status(201).send(response)
    } catch (err) {
      const message = err.message.replace(/['"]+/g, '')
      const response ={
          status : 400, 
          message : message,
      }

      return res.status(400).send(response)
    }
  }

  static async login(req, res, next){
    const payload = req.body;
    try{
      //check if email exist
      const user = await UserServices.getUserFromEmail(payload.email)
      if (!user) throw new Error('User not found')

      //check password right
      const comparePassword= user.password===payload.password
      if (!comparePassword) throw new Error('Password not match')

      //make token
      const token = await jwt.sign(user, process.env.JWT_TOKEN,)

      const dataUser={
          userId : user.id,
          userName : user.name,
          token : token,
        }

      const response = {
        status:200, 
        message: 'Login Success',
        data : dataUser,
      }
    

      return res.status(200).send(response)
    }catch(err){
      const message = err.message.replace(/['"]+/g, '')
        const response = {
          status :400, 
          message : message,
        }

      return res.status(400).send(response)
    }
  }
}
module.exports = userController
/*const datastore = require('../database/datastore');
const nanoid = require('../config/nanoid').default;
const jwt = require('jsonwebtoken');
const mysql= require('mysql')
const validator =require('../tool/validator/validator');
const { response } = require('express');*/
const UserServices = require('../service/userService')

const register = async (req, res) => {
  const payload = req.body
  try {
    const user = await UserServices.getUserFromEmail(payload.email)
    if (user) throw new Error('Username already exist')

    const insertUser = await UserServices.insertUserToDatabase(payload.name, payload.email, payload.password)

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

const login = async (req, res, next) => {
  const payload = req.body;
  try{
    const user = await UserServices.getUserFromEmail(payload.email)
    if (!user) throw new Error('User not found')

    const comparePassword= user.password===payload.password
    if (!comparePassword) throw new Error('Password not match')

      const response = {
        status:200, 
        message: 'Login Success'}

      return res.status(200).send(response)
  }catch(err){
    const message = err.message.replace(/['"]+/g, '')
      const response = {
        status :400, 
        message : message,}

      return res.status(400).send(response)

  }
}





module.exports = {
  register,
  login,
}
const batikServices = require('../service/batikService')

class batikController{
  static async getAllBatiks(req, res){
    try{
      //call all batik in database
      const batiks = await batikServices.getAllBatiks()

      //check if call database succes
      if (!batiks) throw new Error('Error while getting batiks')

      const response = {
        status : 200, 
        message : 'Batiks retrieved successfully', 
        data : batiks,
      }
      return res.status(200).send(response)
    }catch (err) {
      const message = err.message.replace(/['"]+/g, '')

      const response = {
        status : 400, 
        message : message,
      }

      return res.status(400).send(response)
    }
  }
  static async getBatiksById(req, res){
    try{
      //check data of batik 
      const batik = await batikServices.getBatiksById(req.params.id)

      //check if batik exist
      if (!batik) throw new Error('Error while getting batik')
      if (Object.keys(batik).length === 0 ) throw new Error('Error Data is not exist')
    
      const response = {
        status : 200, 
        message : 'batik retrieved successfully', 
        data : batik,
      }
    
      return res.status(200).send(response)
    }catch (err) {
      const message = err.message.replace(/['"]+/g, '')
      const response = {
        status : 400, 
        message : message,
      }
    
      return res.status(400).send(response)
    }
  }
}

module.exports = batikController
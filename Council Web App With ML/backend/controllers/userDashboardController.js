const User = require('../models/userModel')
const University_data = require('../models/universityModel')

// get all users
const getUsers =  async (req, res) => {

  // const email = req.email
  const {id} = req.params
  // console.log("userDashboardController: ",id);
  const users = await User.find({email: id})
  res.status(200).json(users)
}


const getUniversity = async (req, res) => {

  const universities = await University_data.find({})
  res.status(200).json(universities)
}

// signup a user
const createUniversity = async (req, res) => {
  const universities = req.body
  // console.log("UserDashboard Controller formval having univrsity data: ", universities);
  try{
    const university = await University_data.adduniversity(universities)
    res.status(200).json(universities)
  }
  catch (error){
    res.status(400).json({error: error.message})
  }
}

module.exports = {getUsers, getUniversity, createUniversity}
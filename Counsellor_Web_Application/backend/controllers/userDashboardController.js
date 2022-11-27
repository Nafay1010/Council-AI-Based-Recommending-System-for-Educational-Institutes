const User = require('../models/userModel')

// get all users
const getUsers =  async (req, res) => {

  // const email = req.email
  const {id} = req.params
  // console.log("userDashboardController: ",id);
  const users = await User.find({email: id})
  res.status(200).json(users)
}

module.exports = {getUsers}
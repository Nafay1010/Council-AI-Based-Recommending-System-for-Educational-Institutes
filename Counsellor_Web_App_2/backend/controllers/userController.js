const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


//creating token
const createToken = (_id)=>{
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body
  // console.log('Usercontroller: ', {email, password});
  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {formval} = req.body
  // console.log("UserController formval: ", formval);
  try{
    const user = await User.signup(formval)
    //create a token
    const token = createToken(user._id)
    const {email} = formval
    res.status(200).json({email, token})
  }
  catch (error){
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }
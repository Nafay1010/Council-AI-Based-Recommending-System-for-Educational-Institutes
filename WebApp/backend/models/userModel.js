const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({

  //login info
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  //personal info
    fullname: {
    type: String,
    required: true
  },
  CNIC: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  Nationality: {
    type: String,
    required: true
  },
  //contact info
  HomeAddress: {
    type: String,
    required: true
  },
  ContactNo: {
    type: String,
    required: true
  },
  //family info
  FatherName : {
    type: String,
    required: true
  },
  FatherCNIC : {
    type: String,
    required: true,
    unique: true
  },
  FatherContactNo : {
    type: String,
    required: true,
  }


})

module.exports = mongoose.model('User', userSchema)
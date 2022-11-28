const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dataSchema = new Schema({
  CNIC: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  interest: {
    type: String,
    required: true
  },
  study_group: {
    type: String,
    required: true
  },
  transcript : {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Data', dataSchema)
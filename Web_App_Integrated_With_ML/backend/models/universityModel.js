const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UniversitySchema = new Schema({
  university_name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  public_private : {
    type: String,
    required: true
  },
  campuses: {
    type: String,
    required: true
  },
  hostels_acc: {
    type: String,
    required: true
  },
  loan_scholarship : {
    type: String,
    required: true
  },
  Main_link: {
    type: String,
    required: true
  },
  Programs_link : {
    type: String,
    required: true
  },
  Fee_link : {
    type: String,
    required: true
  }
})

//static signup method

UniversitySchema.statics.adduniversity = async function(universities){
  
    // console.log("university_model: ", universities);
  const {university_name, rating, public_private, campuses, hostels_acc, loan_scholarship, Main_link, Programs_link, Fee_link} = universities
  
  const university = await this.create({university_name, rating, public_private, campuses, hostels_acc, loan_scholarship, Main_link, Programs_link, Fee_link})

  return university
}

module.exports = mongoose.model('University_data', UniversitySchema)        
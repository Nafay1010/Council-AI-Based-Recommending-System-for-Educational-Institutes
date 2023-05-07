const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  CNIC: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
  degree_program: {
    type: String,
    required: true,
  },
  preferred_location: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
    required: true,
  },
  study_group: {
    type: String,
    required: true,
  },
  matric_marks: {
    type: Number,
    required: true,
  },
  inter_marks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Data", dataSchema);

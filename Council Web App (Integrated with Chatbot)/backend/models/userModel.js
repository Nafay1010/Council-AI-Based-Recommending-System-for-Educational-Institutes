const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  //login info
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //personal info
  fullname: {
    type: String,
    required: true,
  },
  CNIC: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  Nationality: {
    type: String,
    required: true,
  },
  Race_ethnicity: {
    type: String,
    required: true,
  },
  Preferred_language: {
    type: String,
    required: true,
  },
  //contact info
  HomeAddress: {
    type: String,
    required: true,
  },
  HomeCity: {
    type: String,
    required: true,
  },
  ContactNo: {
    type: String,
    required: true,
  },
  //family info
  FatherName: {
    type: String,
    required: true,
  },
  FatherCNIC: {
    type: String,
    required: true,
    unique: true,
  },
  FatherContactNo: {
    type: String,
    required: true,
  },
  FathersOccupation: {
    type: String,
    required: true,
  },
  MothersOccupation: {
    type: String,
    required: true,
  },
});

//static signup method

userSchema.statics.signup = async function (formval) {
  const {
    email,
    password,
    fullname,
    CNIC,
    gender,
    Nationality,
    HomeAddress,
    ContactNo,
    FatherName,
    FatherCNIC,
    FatherContactNo,
    Race_ethnicity,
    Preferred_language,
    HomeCity,
    FathersOccupation,
    MothersOccupation,
    DOB,
  } = formval;
  //validation
  // console.log("userModel: ", email, password, fullname, CNIC, gender, DOB, Nationality, HomeAddress, ContactNo, FatherName, FatherCNIC, FatherContactNo);
  if (
    !email ||
    !password ||
    !fullname ||
    !CNIC ||
    !gender ||
    !DOB ||
    !Nationality ||
    !HomeAddress ||
    !ContactNo ||
    !FatherName ||
    !FatherCNIC ||
    !FatherContactNo ||
    !Race_ethnicity ||
    !Preferred_language ||
    !HomeCity ||
    !FathersOccupation ||
    !MothersOccupation
  ) {
    throw Error("All Fields Must be filled");
  }
  if (email == "" || password == "") {
    throw Error("Email or Password cant be empty fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  //checking whether email typed exist already in DB
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  //checking whether CNIC typed exist already in DB
  const CNIC_DB = await this.findOne({ CNIC });

  if (CNIC_DB) {
    throw Error("CNIC entered is invalid cause it already exist");
  }

  //generating salt
  const salt = await bcrypt.genSalt(10);
  //generating hash
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    fullname,
    CNIC,
    gender,
    DOB,
    Nationality,
    HomeAddress,
    ContactNo,
    FatherName,
    FatherCNIC,
    FatherContactNo,
    Race_ethnicity,
    Preferred_language,
    HomeCity,
    FathersOccupation,
    MothersOccupation,
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email && !password) {
    throw Error("All fields must be filled");
  }

  if (!email) {
    throw Error("Email not given");
  }

  if (!password) {
    throw Error("Password not given");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);

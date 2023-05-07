const express = require("express");
// const bodyParser = require("body-parser");

// controller functions
const { loginUser, signupUser } = require("../controllers/userController");

const user = express.Router();

// login route
user.post("/login", loginUser);

// signup route
user.post("/signup", signupUser);

module.exports = user;

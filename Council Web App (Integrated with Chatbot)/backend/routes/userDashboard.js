const express = require("express");
// const { exec, spawn } = require("child_process");

const {
  getUsers,
  getUniversity,
  createUniversity,
} = require("../controllers/userDashboardController");

const requireAuth = require("../middeware/requireAuth");

const userDashboard = express.Router();

//Requires Authorization token before accessing database
userDashboard.use(requireAuth);

//GET Method
userDashboard.get("/home:id", getUsers);

//POST University data
userDashboard.post("/search", createUniversity);

//GET University data for search tab
userDashboard.get("/search", getUniversity);

module.exports = userDashboard;

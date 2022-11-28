const express = require('express')
const multer = require('multer')

const {getUsers} = require('../controllers/userDashboardController')

const requireAuth = require('../middeware/requireAuth')

const userDashboard = express.Router()

const Data = require('../models/dataModel')
const mongoose = require('mongoose')

//Requires Authorization token before accessing database
userDashboard.use(requireAuth)

//GET Method
userDashboard.get('/home:id', getUsers)


module.exports = userDashboard
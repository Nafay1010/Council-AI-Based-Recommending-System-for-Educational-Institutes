const express = require('express')

const {getUsers, putUsers} = require('../controllers/userDashboardController')

const requireAuth = require('../middeware/requireAuth')

const userDashboard = express.Router()

//Requires Authorization token before accessing database
userDashboard.use(requireAuth)

//GET Method
userDashboard.get('/home:id', getUsers)


module.exports = userDashboard
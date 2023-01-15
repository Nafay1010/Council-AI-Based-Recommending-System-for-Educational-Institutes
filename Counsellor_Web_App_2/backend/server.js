require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const user = require('./routes/user')
const userDashboard = require('../backend/routes/userDashboard.js')
const multer = require('multer')
const Data = require('./models/dataModel')
//express app
const app = express()
const router = express.Router()

//middleware
app.use(express.json())

router.use(express.static(__dirname+"./images/"));


// images uploading
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './images');
  },
  filename: (req, file, cb) =>{
    cb(null, file.fieldname+"_"+Date.now()+"--"+file.originalname)
  }
})

const upload = multer({storage: fileStorageEngine})

//single image
app.post('/single', upload.single('image'), (req, res)=>{
  const {budget, interest, study_group, CNIC} = JSON.parse(req.body.data)
  const transcript = req.file.filename

  // console.log(req.file);
  const data = Data.create({CNIC, budget, interest, study_group, transcript})

  res.send("Record Added")
});

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


//routes
app.use('/', user)
app.use('/', userDashboard)



//multiple images
// app.post('/multiple', upload.array('images', 3), (req, res)=>{
//   console.log(req.files);
//   res.send("Mutiple files uploaded")
// })



// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
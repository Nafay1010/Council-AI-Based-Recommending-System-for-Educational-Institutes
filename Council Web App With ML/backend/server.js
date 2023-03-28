require("dotenv").config();
const { spawn } = require("child_process");
const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/user");
const userDashboard = require("../backend/routes/userDashboard.js");
const multer = require("multer");
const Data = require("./models/dataModel");
//express app
const app = express();
const router = express.Router();

//middleware
app.use(express.json());

router.use(express.static(__dirname + "./images/"));

// images uploading
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });
//single image

// ---------- app.post kai andar /single wala parameter kai baad upload.single('image') ----------

app.post("/single", upload.single("image"), (req, res) => {
  // console.log("In server.js: ", req.body.data);
  const {
    budget,
    interest,
    degree_program,
    preferred_location,
    CNIC,
    study_group,
    matric_marks,
    inter_marks,
    gender,
    Race_ethnicity,
    Preferred_language,
    HomeCity,
  } = JSON.parse(req.body.data);

  // const transcript = req.file.filename;
  // const data = Data.create({
  //   CNIC,
  //   budget,
  //   interest,
  //   degree_program,
  //   preferred_location,
  //   transcript,
  //   study_group,
  //   matric_marks,
  //   inter_marks,
  // });

  const test = async () => {
    let data1;
    const pythonOne = spawn("python", [
      "recommendation_V5.py",
      CNIC,
      budget,
      interest,
      degree_program,
      preferred_location,
      study_group,
      matric_marks,
      inter_marks,
      gender,
      Preferred_language,
      Race_ethnicity,
      HomeCity,
    ]);
    pythonOne.stdout.on("data", function (data) {
      data1 = data.toString();
    });

    pythonOne.on("close", (code) => {
      if (data1 === undefined || data1 === null || data1 === 0) {
        data1 = [];
        res.status(200).json(data1);
      } else res.status(200).json(data1);
    });
  };
  test();
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/", user);
app.use("/", userDashboard);
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

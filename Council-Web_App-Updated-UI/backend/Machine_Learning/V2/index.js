const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 8812;

app.get("/", (req, res) => {
  let data1;
  const pythonOne = spawn("python", ["recommendation_V3.py", req.params.CNIC]);
  pythonOne.stdout.on("data", function (data) {
    data1 = data.toString();
  });

  pythonOne.on("close", (code) => {
    console.log("data ", data1);
    res.send(data1);
  });
});

// app.get("/", (req, res) => {
//   const python = spawn("python", ["recommending.py"]);
//   python.stdout.on("data", function (data) {
//     pythondata = data.toString();
//   });

//   python.on("close", (code) => {
//     // console.log(pythondata);
//     res.send(pythondata);
//   });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

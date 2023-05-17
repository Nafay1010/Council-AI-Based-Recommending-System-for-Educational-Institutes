import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {
  Typography,
  Backdrop,
  CircularProgress,
  Button,
  InputAdornment,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
// import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import InfoIcon from "@mui/icons-material/Info";

const Counsil = () => {
  const navigate = useNavigate();
  const { users, dispatch } = useUserContext();
  const { user } = useAuthContext();
  const { email } = JSON.parse(localStorage.getItem("User"));
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [budget, setBudget] = useState("");
  const [interest, setInterest] = useState("");
  const [degree_program, setDegree_program] = useState("");
  const [preferred_location, setPreferred_location] = useState("");
  const [study_group, setStudy_group] = useState("");
  const [matric_marks, setMatric_marks] = useState("");
  const [inter_marks, setInter_marks] = useState("");
  const [fileData, setfileData] = useState("");
  const [formProgress, setFormProgress] = useState(0);
  const [open, setOpen] = useState(true);
  // const [selectedButton, setSelectedButton] = useState("XGBoost");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/home" + email, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    if (user) {
      fetchUsers();
    }
    fetchUsers();
  }, [dispatch, user, email]);

  // const fileChangeHandler = (e) => {
  //   setfileData(e.target.files[0]);
  // };
  const handleInputChange = (e) => {
    const fieldCount = 7; // Total number of fields in the form
    const completedFields = Object.values({
      budget,
      interest,
      degree_program,
      preferred_location,
      study_group,
      matric_marks,
      inter_marks,
    }).filter((value) => value !== "").length;

    const progress = (completedFields / fieldCount) * 100;
    setFormProgress(progress);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      parseInt(matric_marks) > 100 ||
      parseInt(inter_marks) > 100 ||
      parseInt(matric_marks) < 0 ||
      parseInt(inter_marks) < 0
    ) {
      setSuccess("");
      setError("Percentage must be below 100% and above 0%");
      return;
    }

    setLoading(true);
    setSuccess("Loading...");
    const CNIC = String(users.map((item) => item.CNIC));
    const user = JSON.parse(localStorage.getItem("User"));
    const { gender, Race_ethnicity, Preferred_language, HomeCity } = user;

    const data = new FormData();
    data.append("image", fileData);
    data.append(
      "data",
      JSON.stringify({
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
        // selectedButton,
      })
    );
    const fetchrecommendation = async () => {
      const response = await fetch("/council", {
        method: "POST",
        body: data,
      });
      // console.log("response: ", response);
      if (response.ok) {
        setError("");
        let json = await response.json();
        // console.log("json: ", json.length !== 0);
        if (json.length !== 0) {
          const splitval = json.split("%");
          const accuracy = parseFloat(splitval[0]).toFixed(1);
          json = splitval[1];
          navigate("/recommendation", {
            state: {
              recommendation: json,
              accuracy: accuracy,
              preferred_location: preferred_location,
              degree_program: degree_program,
              budget: budget,
              interest: interest,
              study_group: study_group,
              matric_marks: matric_marks,
              inter_marks: inter_marks,
            },
          });
        }
        // else {
        //   navigate("/recommendationError");
        // }
      } else {
        setError("Error Occured!");
        setLoading(false);
      }
    };

    fetchrecommendation();
  };
  return (
    <div className="counsil-content">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="counsil-field">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ mb: 1, textAlign: "center" }}>
                Recommendation
              </Typography>
              <Box sx={{ width: "fit-content", mb: 3 }}>
                <Collapse in={open}>
                  <Alert
                    color="primary"
                    action={
                      <IconButton
                        aria-label="close"
                        color="primary"
                        size="inherit"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Please ensure accurate and precise information entry for
                    optimal results.
                  </Alert>
                </Collapse>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={formProgress}
                color="success"
                sx={{ height: 4, borderRadius: 5, mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="field">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Budget"
                  type="text"
                  label="Total Allocated Budget for Tuition"
                  name="Budget"
                  autoComplete="Budget"
                  placeholder="To the Nearest million - e.g 3 Million PKR"
                  color="primary"
                  onChange={(e) => {
                    setBudget(e.target.value);
                    handleInputChange();
                  }}
                  value={budget}
                  sx={{
                    background: "white",
                    width: "310px",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Budget should be Atleast (1 Million) PKR"
                          sx={{ position: "relative", right: "-14px" }}
                        >
                          <InfoIcon />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <br />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  inputMode="text"
                  type="text"
                  label="Hobbies/Interest"
                  name="interest"
                  autoComplete="interest"
                  placeholder="Gaming, Reading, Writing, etc..."
                  color="primary"
                  onChange={(e) => {
                    setInterest(e.target.value);
                    handleInputChange();
                  }}
                  value={interest}
                  sx={{
                    background: "white",
                    width: "310px",
                  }}
                />
                <br />
                <br />
                <InputLabel id="degree_program" className="SelectLabel">
                  Degree Program
                </InputLabel>
                <Select
                  id="degree_program"
                  name="degree_program"
                  fullWidth
                  size="small"
                  color="primary"
                  onChange={(e) => {
                    setDegree_program(e.target.value);
                    handleInputChange();
                  }}
                  value={degree_program}
                  sx={{ width: "310px", background: "#fff" }}
                >
                  <MenuItem value="BSCS">
                    Bachelors in Computer Science (BSCS)
                  </MenuItem>
                  <MenuItem value="BSCybSec">
                    Bachelors in Cyber Security (BSCybSec)
                  </MenuItem>
                  <MenuItem value="BSDataScience">
                    Bachelors in Data Science (BSDS)
                  </MenuItem>
                  <MenuItem value="BSAI">
                    Bachelors in Artificial Intelligence (BSAI)
                  </MenuItem>
                  <MenuItem value="BSSE">
                    Bachelors in Software Engineering (BSSE)
                  </MenuItem>
                  <MenuItem value="BSEE">
                    Bachelors in Electrical Engineering (BSEE)
                  </MenuItem>
                  <MenuItem value="BSMech">
                    Bachelors in Mechanical Engineering (BSME)
                  </MenuItem>
                  <MenuItem value="BSChemical">
                    Bachelors in Chemical Engineering (BSChe)
                  </MenuItem>
                  <MenuItem value="BSEconomics">
                    Bachelors in Economy (BSEconomics)
                  </MenuItem>
                  <MenuItem value="BSCivil">
                    Bachelors in Civil Engineering (BSSE)
                  </MenuItem>
                  <MenuItem value="BBA">
                    Bachelors in Business Administration (BBA)
                  </MenuItem>
                  <MenuItem value="BSAF">BS Accounting and Finance</MenuItem>
                  <MenuItem value="BSElectronics">BS in Electronics.</MenuItem>
                  <MenuItem value="BSNursing">BS Nursing.</MenuItem>
                  <MenuItem value="MBBS">MBBS</MenuItem>
                  <MenuItem value="BSBotany">BS in Botany</MenuItem>
                  <MenuItem value="Biochemistry">Biochemistry</MenuItem>
                  <MenuItem value="BSMath">
                    Bachelors in Mathematics (BSMath)
                  </MenuItem>
                  <MenuItem value="BSEnglish">
                    Bachelors in English (BSEnglish)
                  </MenuItem>
                  <MenuItem value="BSPsychology">
                    Bachelors in Psychology (BSPsychology)
                  </MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel id="preferred_location" className="SelectLabel">
                  Preferred Location
                </InputLabel>
                <Select
                  id="preferred_location"
                  name="preferred_location"
                  fullWidth
                  size="small"
                  color="secondary"
                  onChange={(e) => {
                    setPreferred_location(e.target.value);
                    handleInputChange();
                  }}
                  value={preferred_location}
                  sx={{
                    width: "310px",
                    background: "#fff",
                    textAlign: "left  ",
                  }}
                >
                  <MenuItem value="Karachi">Karachi</MenuItem>
                  <MenuItem value="Lahore">Lahore</MenuItem>
                  <MenuItem value="Peshawar">Peshawar</MenuItem>
                  <MenuItem value="Islamabad">Islamabad</MenuItem>
                </Select>
                <br />
                <br />
                <InputLabel id="study_group" className="SelectLabel">
                  Study Group
                </InputLabel>
                <Select
                  id="study_group"
                  name="study_group"
                  fullWidth
                  size="small"
                  color="secondary"
                  onChange={(e) => setStudy_group(e.target.value)}
                  value={study_group}
                  sx={{ width: "310px", background: "#fff", textAlign: "left" }}
                >
                  <MenuItem value="Pre-Engrr">Pre-Engrr</MenuItem>
                  <MenuItem value="Pre-Med">Pre-Medical</MenuItem>
                  <MenuItem value="CS">Computer Science</MenuItem>
                  <MenuItem value="Commerce">Commerce</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                </Select>
                <br />
                <br />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="matric_marks"
                  label="Matric/O-Level Equivalent Percentage"
                  name="matric_marks"
                  autoComplete="matric_marks"
                  type="number"
                  InputProps={{
                    endAdornment: "%",
                  }}
                  placeholder="E.g: 85%"
                  color="primary"
                  onChange={(e) => {
                    setMatric_marks(e.target.value);
                    handleInputChange();
                  }}
                  value={matric_marks}
                  sx={{
                    background: "white",
                    width: "310px",
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="inter_marks"
                  label="Inter/A-Level Equivalent Percentage"
                  name="inter_marks"
                  type="number"
                  InputProps={{
                    endAdornment: "%",
                  }}
                  autoComplete="inter_marks"
                  placeholder="E.g: 89%"
                  color="primary"
                  onChange={(e) => {
                    setInter_marks(e.target.value);
                    handleInputChange();
                  }}
                  value={inter_marks}
                  sx={{
                    background: "white",
                    width: "310px",
                  }}
                />
                <br />
                <br />
                {/* <label htmlFor="file">Upload Transcript</label>
                  <br />
                  <br />
                  <input
                    type="file"
                    name="file"
                    onChange={fileChangeHandler}
                    className="file-input"
            /> */}
                <div></div>
                {/* <Grid>
                  <Button
                    variant={selectedButton === "XGBoost" ? "outlined" : "text"}
                    size="large"
                    value={"XGBoost"}
                    color={
                      selectedButton === "XGBoost" ? "success" : "secondary"
                    }
                    sx={{ ml: 2, mr: 2, mb: 4 }}
                    onClick={() => handleButtonClick("XGBoost")}
                  >
                    XGBoost (Recommended)
                    <Tooltip
                      title={
                        "XGBoost is a highly accurate and widely used machine learning algorithm known for its effectiveness in solving various problems. It combines the knowledge of multiple models to make predictions, similar to a team of experts collaborating to solve a problem. By iteratively correcting mistakes and focusing on challenging areas, XGBoost achieves remarkable accuracy. It has gained popularity in the machine learning community and has been successfully applied in domains like fraud detection, recommendation systems, and competition-winning models."
                      }
                    >
                      <InfoIcon
                        fontSize="small"
                        sx={{ mb: 2, ml: 1, mr: -2 }}
                        color={
                          selectedButton === "XGBoost" ? "success" : "secondary"
                        }
                      />
                    </Tooltip>
                  </Button>
                  <Button
                    variant={
                      selectedButton === "Stacking" ? "outlined" : "text"
                    }
                    size="large"
                    value={"Stacking"}
                    color={
                      selectedButton === "Stacking" ? "success" : "secondary"
                    }
                    sx={{ ml: 2, mr: 2, mb: 4 }}
                    onClick={() => handleButtonClick("Stacking")}
                  >
                    Stacking
                    <Tooltip
                      title={
                        "Stacking is an ensemble machine learning technique that combines the predictions of multiple models through a meta-learner. It leverages the strengths of diverse models to improve prediction accuracy, making it popular in the machine learning community. By intelligently blending the predictions of individual models, stacking provides more reliable and accurate predictions, making it a valuable tool in solving complex problems across various domains."
                      }
                    >
                      <InfoIcon
                        fontSize="small"
                        sx={{ mb: 2, ml: 1, mr: -2 }}
                        color={
                          selectedButton === "Stacking"
                            ? "success"
                            : "secondary"
                        }
                      />
                    </Tooltip>
                  </Button>
                  <Button
                    variant={
                      selectedButton === "ADABoost" ? "outlined" : "text"
                    }
                    size="large"
                    value={"ADABoost"}
                    color={
                      selectedButton === "ADABoost" ? "success" : "secondary"
                    }
                    sx={{ mr: 2, mb: 4 }}
                    onClick={() => handleButtonClick("ADABoost")}
                  >
                    ADABoost
                    <Tooltip
                      title={
                        "ADABoost is a popular ensemble algorithm that combines multiple models to make accurate predictions. It learns from mistakes and progressively improves its performance by focusing on areas where previous models struggled. ADABoost is widely used and effective in handling complex problems."
                      }
                    >
                      <InfoIcon
                        fontSize="small"
                        sx={{ mb: 2, ml: 1, mr: -2 }}
                        color={
                          selectedButton === "ADABoost"
                            ? "success"
                            : "secondary"
                        }
                      />
                    </Tooltip>
                  </Button>
                  <Button
                    variant={selectedButton === "Bagging" ? "outlined" : "text"}
                    size="large"
                    value={"Bagging"}
                    color={
                      selectedButton === "Bagging" ? "success" : "secondary"
                    }
                    sx={{ mr: 2, mb: 4 }}
                    onClick={() => handleButtonClick("Bagging")}
                  >
                    Bagging Ensemble
                    <Tooltip
                      title={
                        "Bagging is an ensemble technique that creates multiple models trained on different subsets of data. By combining the predictions of these models, Bagging improves prediction accuracy and handles noisy or high-variance data effectively. Bagging is known for its simplicity and effectiveness in enhancing prediction performance."
                      }
                    >
                      <InfoIcon
                        fontSize="small"
                        sx={{ mb: 2, ml: 1, mr: -2 }}
                        color={
                          selectedButton === "Bagging" ? "success" : "secondary"
                        }
                      />
                    </Tooltip>
                  </Button>
                </Grid> */}
                <br />
                <br />
                <div className="submitbtnError">
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    endIcon={<DoubleArrowIcon />}
                    sx={{ mt: -4 }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Backdrop
                    open={loading}
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress color="success" sx={{ mb: 1 }} />
                    <h2 style={{ fontWeight: "100" }}>
                      Running Machine Learning model...
                    </h2>
                    {/* <div className="success_counsil">{success}</div> */}
                  </Backdrop>
                  {error && <div className="error">{error}</div>}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default Counsil;

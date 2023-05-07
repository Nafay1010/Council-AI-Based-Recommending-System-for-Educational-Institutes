import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Typography, Backdrop, CircularProgress, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

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
    if (parseInt(matric_marks) > 1100 || parseInt(inter_marks) > 1100) {
      setSuccess("");
      setError("Marks must be below 1100");
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
        const json = await response.json();
        if (json.length !== 0) {
          navigate("/recommendation", {
            state: {
              recommendation: json,
              preferred_location: preferred_location,
              degree_program: degree_program,
              budget: budget,
              interest: interest,
              study_group: study_group,
              matric_marks: matric_marks,
              inter_marks: inter_marks,
            },
          });
        } else {
          navigate("/recommendation", {
            state: {
              recommendation: [],
              preferred_location: preferred_location,
              degree_program: degree_program,
            },
          });
        }
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
                  label="Total Budget"
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
                />
                <br />
                <br />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="interest"
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
                  sx={{ width: "310px", background: "#fff" }}
                >
                  <MenuItem value="Karachi">Karachi</MenuItem>
                  <MenuItem value="Lahore">Lahore</MenuItem>
                  <MenuItem value="Peshawar">Peshawar</MenuItem>
                  <MenuItem value="Islamabad">Islamabad</MenuItem>
                </Select>
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
                  sx={{ width: "310px", background: "#fff" }}
                >
                  <MenuItem value="Pre-Engrr">Pre-Engrr</MenuItem>
                  <MenuItem value="Pre-Med">Pre-Medical</MenuItem>
                  <MenuItem value="CS">Computer Science</MenuItem>
                  <MenuItem value="Commerce">Commerce</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                </Select>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="matric_marks"
                  label="Matric Marks"
                  name="matric_marks"
                  autoComplete="matric_marks"
                  placeholder="Out of 1100"
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
                  label="Inter Marks"
                  name="inter_marks"
                  autoComplete="inter_marks"
                  placeholder="Out of 1100"
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
                    }}
                  >
                    <CircularProgress color="success" />
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

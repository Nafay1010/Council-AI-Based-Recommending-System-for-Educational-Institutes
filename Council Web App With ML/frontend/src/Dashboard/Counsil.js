import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";

const Counsil = () => {
  const navigate = useNavigate();
  const { users, dispatch } = useUserContext();
  const { user } = useAuthContext();
  const { email } = JSON.parse(localStorage.getItem("User"));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [budget, setBudget] = useState("");
  const [interest, setInterest] = useState("");
  const [degree_program, setDegree_program] = useState("");
  const [preferred_location, setPreferred_location] = useState("");
  const [study_group, setStudy_group] = useState("");
  const [matric_marks, setMatric_marks] = useState("");
  const [inter_marks, setInter_marks] = useState("");
  const [fileData, setfileData] = useState("");

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

  const fileChangeHandler = (e) => {
    setfileData(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      const response = await fetch("/single", {
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
        setSuccess("");
      }
    };

    fetchrecommendation();
  };
  return (
    <div className="counsil-content">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="counsil-field">
          <Typography variant="h4" sx={{ mt: -5, mb: 7, textAlign: "center" }}>
            Recommendation
          </Typography>
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
              onChange={(e) => setBudget(e.target.value)}
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
              onChange={(e) => setInterest(e.target.value)}
              value={interest}
              sx={{
                background: "white",
                width: "310px",
              }}
            />
            <br />
            <br />
            <InputLabel id="degree_program">Degree Program</InputLabel>
            <Select
              id="degree_program"
              name="degree_program"
              fullWidth
              size="small"
              color="primary"
              onChange={(e) => setDegree_program(e.target.value)}
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
            <InputLabel id="preferred_location">Preferred Location</InputLabel>
            <Select
              id="preferred_location"
              name="preferred_location"
              fullWidth
              size="small"
              color="secondary"
              onChange={(e) => setPreferred_location(e.target.value)}
              value={preferred_location}
              sx={{ width: "310px", background: "#fff" }}
            >
              <MenuItem value="Karachi">Karachi</MenuItem>
              <MenuItem value="Lahore">Lahore</MenuItem>
              <MenuItem value="Peshawar">Peshawar</MenuItem>
              <MenuItem value="Islamabad">Islamabad</MenuItem>
            </Select>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="study_group"
              label="Study Group"
              name="study_group"
              autoComplete="study_group"
              placeholder="Pre-Engrr, CS, Pre-Med etc..."
              color="primary"
              onChange={(e) => setStudy_group(e.target.value)}
              value={study_group}
              sx={{
                background: "white",
                width: "310px",
              }}
            /> */}
            <InputLabel id="study_group">Study Group</InputLabel>
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
              onChange={(e) => setMatric_marks(e.target.value)}
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
              onChange={(e) => setInter_marks(e.target.value)}
              value={inter_marks}
              sx={{
                background: "white",
                width: "310px",
              }}
            />
            <br />
            <br />
            <label htmlFor="file">Upload Transcript</label>
            <br />
            <br />
            <input
              type="file"
              name="file"
              onChange={fileChangeHandler}
              className="file-input"
            />
            <br />
            <br />
            <div className="btn">
              <button>Submit</button>
              {success ? (
                <div className="success_counsil">{success}</div>
              ) : (
                error && <div className="error">{error}</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Counsil;

import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PatternFormat } from "react-number-format";

const theme = createTheme();

const Signup = () => {
  const [formval, setFormval] = useState({
    email: "",
    password: "",
    fullname: "",
    CNIC: "",
    gender: "",
    Nationality: "",
    HomeAddress: "",
    ContactNo: "",
    FatherName: "",
    FatherCNIC: "",
    FatherContactNo: "",
    Race_ethnicity: "",
    Preferred_language: "",
    HomeCity: "",
    FathersOccupation: "",
    MothersOccupation: "",
  });
  const [DOB, setDOB] = useState(null);
  const { signup, error, isLoading, success } = useSignup();
  function handleChange(event) {
    const { name, value } = event.target;
    setFormval((prevFormval) => {
      return {
        ...prevFormval,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("At signup: ", formval, DOB);
    await signup(formval, DOB);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="signup-div">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="heading">
            <h1>Registration</h1>
            <br />
            <h3>
              Please fill in the form below. Required fields are marked with an
              Asterik (*)
            </h3>
          </div>
          <div>
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="fullname"
              label="Full Name"
              name="fullname"
              autoComplete="fullname"
              color="primary"
              autoFocus
              onChange={handleChange}
              value={formval.fullname}
              sx={{
                background: "white",
              }}
            />
          </div>
          <div>
            <label htmlFor="CNIC" className="CNIC-label">
              CNIC*
            </label>
            <PatternFormat
              format="#####-#######-#"
              allowEmptyFormatting
              value={formval.CNIC}
              id="CNIC"
              label="CNIC"
              name="CNIC"
              required
              onChange={handleChange}
              className="CNIC-textbox"
            />
          </div>
          <div>
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="Nationality"
              label="Nationality"
              name="Nationality"
              autoComplete="Nationality"
              onChange={handleChange}
              value={formval.Nationality}
              sx={{
                background: "#fff",
              }}
            />
          </div>
          <div className="gender">
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              id="gender"
              name="gender"
              fullWidth
              size="small"
              color="secondary"
              onChange={handleChange}
              value={formval.gender}
              sx={{ minWidth: "150px", background: "#fff" }}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Prefer Not to tell</MenuItem>
            </Select>
          </div>
          <div>
            <InputLabel id="Preferred_language">Preferred Language</InputLabel>
            <Select
              id="Preferred_language"
              name="Preferred_language"
              size="small"
              fullWidth
              color="secondary"
              onChange={handleChange}
              value={formval.Preferred_language}
              sx={{ minWidth: "150px", background: "#fff" }}
            >
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Urdu"}>Urdu</MenuItem>
              <MenuItem value={"Pashto"}>Pashto</MenuItem>
              <MenuItem value={"Hinko"}>Hinko</MenuItem>
              <MenuItem value={"Punjabi"}>Punjabi</MenuItem>
              <MenuItem value={"Sindhi"}>Sindhi</MenuItem>
              <MenuItem value={"Saraiki"}>Saraiki</MenuItem>
              <MenuItem value={"Balochi"}>Balochi</MenuItem>
              <MenuItem value={"Pahari-Pothwari"}>Pahari-Pothwari</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            <FormHelperText>Please select your first language</FormHelperText>
          </div>
          <div>
            <InputLabel id="Race_ethnicity">Race_ethnicity</InputLabel>
            <Select
              id="Race_ethnicity"
              name="Race_ethnicity"
              size="small"
              fullWidth
              color="secondary"
              onChange={handleChange}
              value={formval.Race_ethnicity}
              sx={{
                minWidth: "150px",
                background: "#fff",
              }}
            >
              <MenuItem value={"Punjabi"}>Punjabi</MenuItem>
              <MenuItem value={"Pashtun"}>Pashtun</MenuItem>
              <MenuItem value={"Sindhi"}>Sindhi</MenuItem>
              <MenuItem value={"Baloch"}>Baloch</MenuItem>
              <MenuItem value={"Brahuis"}>Brahuis</MenuItem>
              <MenuItem value={"Muhajirs"}>Muhajirs</MenuItem>
              <MenuItem value={"Kashmiris"}>Kashmiris</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </div>

          <div className="DOB">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={DOB}
                color="primary"
                onChange={(e) => setDOB(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div className="HomeAddress">
            <textarea
              name="HomeAddress"
              placeholder="Enter Your Home Address"
              value={formval.HomeAddress}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              margin="none"
              required
              fullWidth
              size="small"
              id="ContactNo"
              label="ContactNo"
              name="ContactNo"
              autoComplete="ContactNo"
              onChange={handleChange}
              value={formval.ContactNo}
              sx={{
                background: "#fff",
              }}
            />
          </div>
          <div className="HomeCity">
            <InputLabel id="HomeCity" sx={{ marginTop: -3 }}>
              {" "}
              Home City
            </InputLabel>
            <Select
              id="HomeCity"
              name="HomeCity"
              fullWidth
              size="small"
              color="secondary"
              onChange={handleChange}
              value={formval.HomeCity}
              sx={{ minWidth: "150px", background: "#fff" }}
            >
              <MenuItem value={"Karachi"}>Karachi</MenuItem>
              <MenuItem value={"Lahore"}>Lahore</MenuItem>
              <MenuItem value={"Faisalabad"}>Faisalabad</MenuItem>
              <MenuItem value={"Rawalpindi"}>Rawalpindi</MenuItem>
              <MenuItem value={"Gujranwala"}>Gujranwala</MenuItem>
              <MenuItem value={"Peshawar"}>Peshawar</MenuItem>
              <MenuItem value={"Multan"}>Multan</MenuItem>
              <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
              <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
              <MenuItem value={"Quetta"}>Quetta</MenuItem>
              <MenuItem value={"Bahawalpur"}>Bahawalpur</MenuItem>
              <MenuItem value={"Sargodha"}>Sargodha</MenuItem>
              <MenuItem value={"Sialkot"}>Sialkot</MenuItem>
              <MenuItem value={"Sukkur"}>Sukkur</MenuItem>
              <MenuItem value={"Larkana"}>Larkana</MenuItem>
              <MenuItem value={"Dera-Ghazi-Khan"}>Dera-Ghazi-Khan</MenuItem>
              <MenuItem value={"Gujrat"}>Gujrat</MenuItem>
              <MenuItem value={"Sahiwal"}>Sahiwal</MenuItem>
              <MenuItem value={"Mardan"}>Mardan</MenuItem>
              <MenuItem value={"Chiniot"}>Chiniot</MenuItem>
              <MenuItem value={"Nawabshah"}>Nawabshah</MenuItem>
              <MenuItem value={"Mirpur-Khas"}>Mirpur-Khas</MenuItem>
              <MenuItem value={"Kohat"}>Kohat</MenuItem>
              <MenuItem value={"Dera-Ismail-Khan"}>Dera-Ismail-Khan</MenuItem>
              <MenuItem value={"Abbotabad"}>Abbotabad</MenuItem>
              <MenuItem value={"Turbat"}>Turbat</MenuItem>
              <MenuItem value={"Khuzdar"}>Khuzdar</MenuItem>
              <MenuItem value={"Muzaffarabad"}>Muzaffarabad</MenuItem>
              <MenuItem value={"Mirpur"}>Mirpur</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </div>
          <div>
            <TextField
              margin="none"
              required
              fullWidth
              size="small"
              id="FatherName"
              label="FatherName"
              name="FatherName"
              autoComplete="FatherName"
              onChange={handleChange}
              value={formval.FatherName}
              sx={{
                background: "#fff",
              }}
            />
          </div>
          <div>
            <label htmlFor="CNIC" className="F_CNIC-label">
              Father's CNIC*
            </label>
            <PatternFormat
              format="#####-#######-#"
              allowEmptyFormatting
              value={formval.FatherCNIC}
              id="FatherCNIC"
              label="FatherCNIC"
              name="FatherCNIC"
              required
              onChange={handleChange}
              className="F_CNIC-textbox"
            />
          </div>
          <div>
            <TextField
              margin="none"
              required
              fullWidth
              size="small"
              id="FatherContactNo"
              label="Father's Contact Number"
              name="FatherContactNo"
              autoComplete="FatherContactNo"
              onChange={handleChange}
              value={formval.FatherContactNo}
              sx={{
                background: "#fff",
              }}
            />
          </div>
          <div className="FathersOccupation">
            <InputLabel id="FathersOccupation">Father's Occupation</InputLabel>
            <Select
              id="FathersOccupation"
              name="FathersOccupation"
              size="small"
              fullWidth
              color="secondary"
              onChange={handleChange}
              value={formval.FathersOccupation}
              sx={{ minWidth: "150px", background: "#fff" }}
            >
              <MenuItem value={"Engrr"}>Engineer</MenuItem>
              <MenuItem value={"Doctor"}>Doctor</MenuItem>
              <MenuItem value={"Teacher"}>Teacher</MenuItem>
              <MenuItem value={"Army"}>Army</MenuItem>
              <MenuItem value={"Retired"}>Retired</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </div>
          <div></div>
          <div className="MothersOccupation">
            <InputLabel id="MothersOccupation">Mother's Occupation</InputLabel>
            <Select
              id="MothersOccupation"
              name="MothersOccupation"
              size="small"
              fullWidth
              color="secondary"
              onChange={handleChange}
              value={formval.MothersOccupation}
              sx={{ minWidth: "150px", background: "#fff" }}
            >
              <MenuItem value={"Doctor"}>Doctor</MenuItem>
              <MenuItem value={"Teacher"}>Teacher</MenuItem>
              <MenuItem value={"House-Wife"}>House Wife</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </div>
          <div className="email">
            <TextField
              margin="none"
              required
              fullWidth
              id="email"
              label="Enter your new Email "
              color="success"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={formval.email}
              sx={{
                background: "#fff",
                marginTop: 6,
              }}
            />
          </div>
          <div></div>
          <div className="password">
            <TextField
              margin="none"
              required
              fullWidth
              type="password"
              id="password"
              label="Enter your new Password "
              color="success"
              name="password"
              autoComplete="password"
              onChange={handleChange}
              value={formval.password}
              sx={{
                background: "#fff",
                marginTop: 6,
              }}
            />
          </div>
          <div></div>
          <div className="btn-submit">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 5, mb: 2 }}
              disabled={isLoading}
            >
              Register!
            </Button>
          </div>
          <div></div>
          <div></div>
          <div style={{ display: "block" }}>
            {success ? (
              <div className="success">{success}</div>
            ) : (
              error && <div className="error">{error}</div>
            )}
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default Signup;

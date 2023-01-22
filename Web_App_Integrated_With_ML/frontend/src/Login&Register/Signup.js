import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [formval, setFormval] = useState({
    email: "",
    password: "",
    fullname: "",
    CNIC: "",
    DOB: "",
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

    console.log("At signup: ", formval);
    await signup(formval);
  };

  return (
    <div className="signup-div">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Registration</h1>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <br />
          <input
            // required
            type="text"
            name="fullname"
            value={formval.fullname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="CNIC">CNIC</label>
          <br />
          <input
            // required
            type="text"
            name="CNIC"
            value={formval.CNIC}
            onChange={handleChange}
          />
        </div>
        <div className="gender">
          <legend>Gender</legend>
          <select
            // required
            id="gender"
            name="gender"
            onChange={handleChange}
            value={formval.gender}
          >
            <option value="">--Choose--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Prefer Not To Tell</option>
          </select>
        </div>
        <div>
          <label htmlFor="Nationality">Nationality</label>
          <br />
          <input
            // required
            type="text"
            name="Nationality"
            value={formval.Nationality}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Preferred_language">First Language</label>
          <br />
          <select
            id="Preferred_language"
            name="Preferred_language"
            onChange={handleChange}
            value={formval.Preferred_language}
          >
            <option value="">--Choose--</option>
            <option value="English">English</option>
            <option value="Urdu">Urdu</option>
            <option value="Pashto">Pashto</option>
            <option value="Hinko">Hinko</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Sindhi">Sindhi</option>
            <option value="Saraiki">Saraiki</option>
            <option value="Balochi">Balochi</option>
            <option value="Pahari-Pothwari">Pahari-Pothwari</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="Race_ethnicity">Race/Ethnicity</label>
          <br />
          <select
            id="Race_ethnicity"
            name="Race_ethnicity"
            onChange={handleChange}
            value={formval.Race_ethnicity}
          >
            <option value="">--Choose--</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Pashtun">Pashtun</option>
            <option value="Sindhi">Sindhi</option>
            <option value="Baloch">Baloch</option>
            <option value="Brahuis">Brahuis</option>
            <option value="Muhajirs">Muhajirs</option>
            <option value="Kashmiris">Kashmiris</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="DOB">Date of Birth</label>
          <br />
          <input
            // required
            type="Date"
            name="DOB"
            value={formval.DOB}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ContactNo">Contact No.</label>
          <br />
          <input
            // required
            type="text"
            name="ContactNo"
            value={formval.ContactNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <legend>Home Address</legend>
          <textarea
            // required
            name="HomeAddress"
            value={formval.HomeAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="HomeCity">Home City</label>
          <br />
          <select
            id="HomeCity"
            name="HomeCity"
            onChange={handleChange}
            value={formval.HomeCity}
          >
            <option value="">--Choose--</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Gujranwala">Gujranwala</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Multan">Multan</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Quetta">Quetta</option>
            <option value="Bahawalpur">Bahawalpur</option>
            <option value="Sargodha">Sargodha</option>
            <option value="Sialkot">Sialkot</option>
            <option value="Sukkur">Sukkur</option>
            <option value="Larkana">Larkana</option>
            <option value="Dera-Ghazi-Khan">Dera-Ghazi-Khan</option>
            <option value="Gujrat">Gujrat</option>
            <option value="Sahiwal">Sahiwal</option>
            <option value="Mardan">Mardan</option>
            <option value="Chiniot">Chiniot</option>
            <option value="Nawabshah">Nawabshah</option>
            <option value="Mirpur-Khas">Mirpur-Khas</option>
            <option value="Kohat">Kohat</option>
            <option value="Dera-Ismail-Khan">Dera-Ismail-Khan</option>
            <option value="Abbotabad">Abbotabad</option>
            <option value="Turbat">Turbat</option>
            <option value="Khuzdar">Khuzdar</option>
            <option value="Muzaffarabad">Muzaffarabad</option>
            <option value="Mirpur">Mirpur</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="FathersName">Father's Name</label>
          <br />
          <input
            // required
            type="text"
            name="FatherName"
            value={formval.FatherName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="FatherCNIC">Father's CNIC</label>
          <br />
          <input
            // required
            type="text"
            name="FatherCNIC"
            value={formval.FatherCNIC}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="FatherContactNo">Father's Contact No.</label>
          <br />
          <input
            // required
            type="text"
            name="FatherContactNo"
            value={formval.FatherContactNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="FathersOccupation">Father's Occupation</label>
          <br />
          <select
            id="FathersOccupation"
            name="FathersOccupation"
            onChange={handleChange}
            value={formval.FathersOccupation}
          >
            <option value="">--Choose--</option>
            <option value="Engrr">Engineer</option>
            <option value="Doctor">Doctor</option>
            <option value="Teacher">Teacher</option>
            <option value="Army">Army</option>
            <option value="Retired">Retired</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="MothersOccupation">
          <label htmlFor="MothersOccupation">Mother's Occupation</label>
          <br />
          <select
            id="MothersOccupation"
            name="MothersOccupation"
            onChange={handleChange}
            value={formval.MothersOccupation}
          >
            <option value="">--Choose--</option>
            <option value="Doctor">Doctor</option>
            <option value="Teacher">Teacher</option>
            <option value="House-Wife">House Wife</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="email">
          <fieldset>
            <label htmlFor="email">Enter Your New Email</label>
            <br />
            <input
              // required
              type="email"
              name="email"
              value={formval.email}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="password">
          <fieldset>
            <label htmlFor="password">Enter Your New Password</label>
            <br />
            <input
              // required
              type="password"
              name="password"
              value={formval.password}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="button">
          <button disabled={isLoading}>Sign up</button>
          {success ? (
            <div className="success">{success}</div>
          ) : (
            error && <div className="error">{error}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;

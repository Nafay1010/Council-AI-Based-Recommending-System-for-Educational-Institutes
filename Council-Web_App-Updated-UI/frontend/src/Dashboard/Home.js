import { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import placeholderimg from "./Profile-Pic-Placeholder.jpg";
import Loading from "./Loading";
import moment from "moment";
// components

const Home = () => {
  const { users, dispatch } = useUserContext();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { email } = JSON.parse(localStorage.getItem("User"));
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
        setLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
    fetchUsers();
  }, [dispatch, user, email]);
  return (
    <div className="home">
      <div className="user-dashboard">
        {/* <div className="placeholder-img"> */}
        {loading ? (
          <div className="loading-home">
            <Loading />
          </div>
        ) : (
          <div>
            <div className="placeholder-img">
              <img src={placeholderimg} alt="placeholderimg" />
              {users &&
                users.map((item) => (
                  <div key={item._id}>
                    <h2>{item.fullname}</h2>
                  </div>
                ))}
            </div>
            <div className="personal-info">
              {users &&
                users.map((item) => (
                  <div className="wrapper" key={item._id}>
                    <div className="table">
                      <div className="row header">
                        <div className="cell" style={{ color: "white" }}>
                          Personal Information
                        </div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Full Name
                        </div>
                        <div className="cell">{item.fullname}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Email
                        </div>
                        <div className="cell">{item.email}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Gender
                        </div>
                        <div className="cell">{item.gender}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          CNIC
                        </div>
                        <div className="cell">{item.CNIC}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Nationality
                        </div>
                        <div className="cell">{item.Nationality}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Race/Ethnicity
                        </div>
                        <div className="cell">{item.Race_ethnicity}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          First Language
                        </div>
                        <div className="cell">{item.Preferred_language}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Date of Birth
                        </div>
                        <div className="cell">
                          {moment(item.DOB).format("MMMM Do YYYY")}
                        </div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>
                    </div>

                    {/* ------------------------------------------------------------------ */}

                    <div className="table">
                      <div className="row header">
                        <div className="cell" style={{ color: "white" }}>
                          Contact Information
                        </div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>
                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Home Address
                        </div>
                        <div className="cell">{item.HomeAddress}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Home City
                        </div>
                        <div className="cell">{item.HomeCity}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Contact Number
                        </div>
                        <div className="cell">{item.ContactNo}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>
                    </div>

                    {/* ------------------------------------------------------------------------- */}

                    <div className="table">
                      <div className="row header">
                        <div className="cell" style={{ color: "white" }}>
                          Family Information
                        </div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Father's Name
                        </div>
                        <div className="cell">{item.FatherName}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>

                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Father's CNIC
                        </div>
                        <div className="cell">{item.FatherCNIC}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>
                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Father's Contact Number
                        </div>
                        <div className="cell">{item.FatherContactNo}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>
                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Father's Occupation
                        </div>
                        <div className="cell">{item.FathersOccupation}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>
                      <div className="row">
                        <div className="cell" style={{ fontWeight: "bold" }}>
                          Mother's Occupation
                        </div>
                        <div className="cell">{item.MothersOccupation}</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {/* </div> */}

        {/* {users &&  users.map(item => (
        <ul key={item._id}>
          <h4>Personal Information</h4>
          <li>Email: {item.email}</li>
          <li>CNIC: {item.CNIC}</li>
          <li>Gender: {item.gender}</li>
          <li>Date Of Birth: {item.DOB}</li>
          <li>Nationality: {item.Nationality}</li>
          <h4>Contact Information</h4>
          <li>Contact Number: {item.ContactNo}</li>
          <li>Exact Home Address: {item.HomeAddress}</li>
          <h4>Family Information</h4>
          <li>Father's Name: {item.FatherName}</li>
          <li>Father's CNIC: {item.FatherCNIC}</li>
          <li>Fathers Contact No: {item.FatherContactNo}</li>
        </ul>
        ))} */}
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Search from "./Search";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Recommendation = () => {
  const location = useLocation();
  // const X = ["COMSATS", "NUST", "FAST NUCES", "LUMS"];
  let [recommendation] = useState(location.state.recommendation);

  let [preferred_location] = useState(location.state.preferred_location.trim());
  let [degree_program] = useState(location.state.degree_program.trim());
  const { universities, dispatch } = useUserContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/search", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_UNIVERSITIES", payload: json });
      }
    };

    if (user) {
      fetchUsers();
    }
    fetchUsers();
  }, [user, dispatch]);
  if (recommendation.length === 0) {
    return (
      <div className="search-content">
        <div className="recommendation-list">
          <h1 style={{ marginTop: "50px", fontWeight: "400" }}>
            Data-Set of University is Limited.
          </h1>
          <div className="backbtn">
            <Link to="/counsil">
              <button>Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="search-content">
        <div className="recommendation-list">
          <h1 style={{ fontWeight: 400 }}>Recommendation</h1>
          {!universities ? (
            <div className="loading-recommendation">
              <Loading />
            </div>
          ) : (
            universities
              .filter((university) =>
                recommendation.includes(university.university_name)
              )
              .map((university, key) => {
                return (
                  <div key={key}>
                    {
                      <Search
                        university={university}
                        preferred_location={preferred_location}
                        degree_program={degree_program}
                        border={"2.5px solid #f5d000"}
                      />
                    }
                  </div>
                );
              })
          )}

          <div className="backbtn">
            <Link to="/counsil">
              <button>Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Recommendation;

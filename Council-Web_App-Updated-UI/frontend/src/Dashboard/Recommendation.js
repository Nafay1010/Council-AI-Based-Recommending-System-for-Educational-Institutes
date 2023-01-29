import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Search from "./Search";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Recommendation = () => {
  const location = useLocation();
  let [recommendation] = useState(location.state.recommendation.trim());
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
  return (
    <div className="search-content">
      <div className="recommendation-list">
        {!universities ? (
          <div className="loading-recommendation">
            <Loading />
          </div>
        ) : (
          universities
            .filter((university) => {
              if (university.university_name === recommendation)
                return university;
              else return false;
            })
            .map((university, key) => {
              return (
                <div>
                  <h1>Recommendation</h1>
                  {
                    <Search
                      university={university}
                      key={key}
                      border={"3px solid #06b206"}
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
};

export default Recommendation;

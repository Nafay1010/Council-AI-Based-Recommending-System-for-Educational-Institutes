import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Search from "./Search";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Backdrop, CircularProgress, Button } from "@mui/material";

const Recommendation = () => {
  const location = useLocation();
  // const X = ["COMSATS", "NUST", "FAST NUCES", "LUMS"];
  let [recommendation] = useState(location.state.recommendation);
  console.log(recommendation);
  let [accuracy] = useState(location.state.accuracy.trim());
  let [preferred_location] = useState(location.state.preferred_location.trim());
  let [degree_program] = useState(location.state.degree_program.trim());
  let [budget] = useState(location.state.budget.trim());
  let [interest] = useState(location.state.interest.trim());
  let [study_group] = useState(location.state.study_group.trim());
  let [matric_marks] = useState(location.state.matric_marks.trim());
  let [inter_marks] = useState(location.state.inter_marks.trim());
  // const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(true);

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
  if (recommendation === undefined) {
    return (
      <div className="search-content">
        <div className="recommendation-list">
          <h1 style={{ marginTop: "50px", fontWeight: "400" }}>
            Data-Set of University is Limited!
          </h1>
          <h2
            style={{
              fontWeight: "100",
              fontWeight: "normal",
              marginTop: "30px",
            }}
          >
            Try the following approaches:
          </h2>
          <div className="guide">
            <h2
              style={{
                fontWeight: "normal",
                marginTop: "10px",
                marginTop: "30px",
              }}
            >
              - Your budget might be too low, try again but this time with
              increased budget.
            </h2>
            <h2 style={{ fontWeight: "normal", marginTop: "10px" }}>
              - Try changing your preferred location.
            </h2>
            <h2 style={{ fontWeight: "normal", marginTop: "10px" }}>
              - Check whether the input given is misplet or incorrect.
            </h2>
            <h2 style={{ fontWeight: "normal", marginTop: "10px" }}>
              - Restart the whole application.
            </h2>
          </div>
          <div className="backbtn">
            <Link to="/Council">
              <button>Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {!universities ? (
          // <div className="loading-recommendation">
          //   <Loading />
          // </div>
          <Backdrop
            open={!universities}
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
        ) : (
          <div className="search-content">
            <div className="recommendation-heading">
              <h1
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  fontWeight: "normal",
                  fontSize: "26px",
                  lineHeight: "22px",
                }}
              >
                The following list of educational institutions has been
                generated based on your preferences.
              </h1>
              <Box sx={{ width: "100%", mb: 3 }}>
                <Collapse in={open}>
                  <Alert
                    color="primary"
                    action={
                      <IconButton
                        aria-label="close"
                        color="primary"
                        size="medium"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    You can provide us with feedback on your most preferred
                    university from the list. Click the "Feedback" button next
                    to your preferred university to submit your preference. Your
                    feedback will help us improve our recommendations. Please
                    note that you can only give feedback{" "}
                    <span style={{ fontWeight: "bold" }}>once</span>, so choose
                    carefully. You will be redirected to the dashboard right
                    after.
                  </Alert>
                </Collapse>
              </Box>
            </div>
            <div className="recommendation-list">
              <div className="accuracy">
                <div className="ribbon ribbon-top-right">
                  <span style={{ fontSize: "12px" }}>{accuracy}% Accuracy</span>
                </div>
              </div>
              {universities
                .filter((university) =>
                  recommendation.includes(university.university_name)
                )
                .map((university, key) => (
                  <div key={key}>
                    <Search
                      university={university}
                      key={key}
                      preferred_location={preferred_location}
                      degree_program={degree_program}
                      budget={budget}
                      interest={interest}
                      study_group={study_group}
                      matric_marks={matric_marks}
                      inter_marks={inter_marks}
                      border={"2.5px solid #f5d000"}
                      choose={true}
                    />
                  </div>
                ))}
              <div className="backbtn">
                <Link to="/Council">
                  <button>Go Back</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Recommendation;

import * as React from "react";
import Rate from "./Rate";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Search = ({
  university,
  preferred_location,
  budget,
  interest,
  study_group,
  key,
  border,
  degree_program,
  matric_marks,
  inter_marks,
  choose,
}) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const info = JSON.parse(localStorage.getItem("User"));
  const {
    email,
    gender,
    Race_ethnicity,
    Preferred_language,
    HomeCity,
    FathersOccupation,
    MothersOccupation,
  } = info;
  const navigate = useNavigate();

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChoose = async () => {
    setOpen(false);
    let year = new Date().getFullYear().toString();
    const UNI = university.university_name;
    const feedback = new FormData();
    feedback.append(
      "feedback",
      JSON.stringify({
        gender,
        Race_ethnicity,
        HomeCity,
        Preferred_language,
        interest,
        budget,
        FathersOccupation,
        MothersOccupation,
        study_group,
        degree_program,
        matric_marks,
        inter_marks,
        year,
        preferred_location,
        UNI,
      })
    );
    const appendTraining = async () => {
      const response = await fetch("/Feedback", {
        method: "POST",
        body: feedback,
      });
      if (response.ok) {
        setAlertOpen(true);
        setCountdown(5);
        setFeedbackSubmitted(true);
        setIsFeedbackSubmitted(true);

        localStorage.setItem(`isFeedbackSubmitted_${email}`, true);
      }
    };

    appendTraining();
  };

  useEffect(() => {
    if (countdown > 0) {
      const timeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      // Clean up the timeout on component unmount or when countdown changes
      return () => clearTimeout(timeout);
    } else if (countdown === 0 && feedbackSubmitted) {
      navigate("/home");
    }
    const storedFeedbackStatus = localStorage.getItem(
      `isFeedbackSubmitted_${email}`
    );
    if (storedFeedbackStatus) {
      setIsFeedbackSubmitted(true);
    }
  }, [countdown, feedbackSubmitted, isFeedbackSubmitted]);

  return (
    <div>
      <div className="search-content">
        <a
          href={university.Main_link}
          target="_blank"
          rel="noopener noreferrer"
          className="container-link"
          style={{ color: "black" }}
        >
          <div className="container" style={{ border: border }} key={key}>
            <div className="upper">
              <h2 className="title">{university.university_name}</h2>
              <Rate
                className="stars"
                count={university.rating}
                key={university._id}
              />
              <h5 className="private-public">{university.public_private}</h5>
            </div>
            <div className="loc">
              <FontAwesomeIcon
                icon={faLocationDot}
                color={"#969696"}
              ></FontAwesomeIcon>
              <h5>{preferred_location} Campus</h5>
              {!degree_program ? (
                <span></span>
              ) : (
                <span className="degree_program">
                  {degree_program} Offered:{" "}
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </span>
              )}
            </div>
            <div className="loan-hostel">
              <div className="hostel">
                <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon>
                <p>Hostel Accommodation:</p>
                {university.hostels_acc === "Yes" ? (
                  <h4 className="btn-yes">{university.hostels_acc}</h4>
                ) : (
                  <h4 className="btn-no">{university.hostels_acc}</h4>
                )}
              </div>
              <div className="loan">
                <FontAwesomeIcon icon={faSackDollar}></FontAwesomeIcon>
                <p>Loan/Scholarship:</p>
                {university.loan_scholarship === "Yes" ? (
                  <h4 className="btn-yes">{university.loan_scholarship}</h4>
                ) : (
                  <h4 className="btn-no">{university.loan_scholarship}</h4>
                )}
              </div>
            </div>
            <div className="programs-fee">
              <a
                href={university.Programs_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="programs">Programs Info</button>
              </a>
              <a
                href={university.Fee_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Fee Structure</button>
              </a>
            </div>
            {choose ? (
              <div>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  endIcon={<SendIcon />}
                  sx={{ mt: 2 }}
                  onClick={handleClickOpen}
                  disabled={isFeedbackSubmitted}
                >
                  Submit Feedback
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  // TransitionComponent={Transition}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 700 }}>
                    {"Confirm Submission?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      sx={{ fontWeight: 700 }}
                    >
                      Are you sure you want to choose this as your most
                      preferred institute.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleChoose}
                      variant="contained"
                      color="success"
                      autoFocus
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </a>
      </div>
      <div style={{ marginTop: "50px" }}>
        {feedbackSubmitted && (
          <Snackbar
            open={true}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert elevation={6} variant="filled" severity="success">
              Thank you for submitting feedback. Navigating to the home screen
              in {countdown}...
            </Alert>
          </Snackbar>
        )}
      </div>
    </div>
  );
};

export default Search;

import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="first-col">
        <h1>Council</h1>
        <h5>
          A project to help young students make the perfect decision in finding
          a university that best fits their preferences and requirements.
        </h5>
      </div>
      <div className="second-col">
        <div className="links-footer">
          <Link to={"/"}>
            <h4>Home</h4>
          </Link>
          <Link to={"/aboutUs"}>
            <h4>About us</h4>
          </Link>
          <Link to={"/login"}>
            <h4>Log In</h4>
          </Link>
          <Link to={"/signup"}>
            <h4>Sign In</h4>
          </Link>
        </div>
      </div>
      <div className="third-col">
        <span className="icon">
          <FacebookIcon fontSize="large" />
          <TwitterIcon fontSize="large" />
          <GitHubIcon fontSize="large" />
          <InstagramIcon fontSize="large" />
          <LinkedInIcon fontSize="large" />
        </span>
      </div>
    </div>
  );
};

export default Footer;

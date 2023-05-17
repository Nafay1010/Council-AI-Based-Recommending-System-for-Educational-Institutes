import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";

const SidebarComponent = () => {
  const { collapseSidebar } = useProSidebar();
  const [check, setCheck] = useState(true);
  const { logout } = useLogout();

  const handleClick = () => {
    collapseSidebar();
    setCheck((prevCheck) => !prevCheck);
  };

  const handlelogout = () => {
    logout();
  };
  return (
    <div>
      <Sidebar
        style={{
          backgroundColor: "whitesmoke",
          position: "fixed",
          height: "100%",
        }}
        width={"200px"}
      >
        <div className="navbar-logo">
          {check ? (
            <h1 onClick={handleClick}>Council</h1>
          ) : (
            <button className="logobtn" onClick={handleClick}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Menu className="menu-items">
          <NavLink to={"/home"} style={{ color: "black" }}>
            <MenuItem>
              <FontAwesomeIcon className="icon" icon={faHouse} />
              Home
            </MenuItem>
          </NavLink>
          <br />
          <br />
          <br />
          <br />
          <NavLink to={"/Search"} style={{ color: "black" }}>
            <MenuItem>
              <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
              Explore
            </MenuItem>
          </NavLink>
          <br />
          <br />
          <br />
          <br />
          <NavLink to={"/Chatbot"} style={{ color: "black" }}>
            <MenuItem>
              <FontAwesomeIcon className="icon" icon={faRobot} />
              CouncilBot
            </MenuItem>
          </NavLink>
          <br />
          <br />
          <br />
          <br />
          <NavLink to={"/Council"} style={{ color: "black" }}>
            <MenuItem>
              <FontAwesomeIcon className="icon" icon={faCheck} />
              Counselling
            </MenuItem>
          </NavLink>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <NavLink to={"/login"} style={{ color: "black" }}>
            <MenuItem onClick={handlelogout}>
              <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
              Logout
            </MenuItem>
          </NavLink>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;

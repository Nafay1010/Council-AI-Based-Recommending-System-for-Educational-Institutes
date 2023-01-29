import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar-notloggedin">
      <h1>Council</h1>
      <div className="links">
        <NavLink id="home" to="/">
          <h4>Home</h4>
        </NavLink>
        <NavLink id="about-us" to="/aboutUs">
          <h4>About Us</h4>
        </NavLink>
        <NavLink id="login" to="/login">
          <h4>Login</h4>
        </NavLink>
        <NavLink id="signup" to="/signup">
          <h4>Signup</h4>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar-notloggedin">
      <h1>Counsellor</h1>
      <div className="links">
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

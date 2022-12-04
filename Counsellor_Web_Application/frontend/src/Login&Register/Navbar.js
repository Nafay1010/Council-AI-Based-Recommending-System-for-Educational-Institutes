import { Link } from 'react-router-dom'
const Navbar = () => {

  return (
    <nav className='navbar-notloggedin'>
      <h1>Counsellor</h1>
      <div className="links">
          <Link id="login" to='/login'><h4>Login</h4></Link>
          <Link id="signup" to='/signup'><h4>Signup</h4></Link>
      </div>
    </nav>
  )
}

export default Navbar
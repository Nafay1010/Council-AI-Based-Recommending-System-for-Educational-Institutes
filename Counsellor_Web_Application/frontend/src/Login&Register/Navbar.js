import { Link } from 'react-router-dom'
const Navbar = () => {

  return (
    <nav className='navbar-notloggedin'>
      <Link to='/home'><h1>Counsellor</h1></Link>
      <div className="links">
          <Link to='/login'><h4>Login</h4></Link>
          <Link to='/signup'><h4>Signup</h4></Link>
      </div>
    </nav>
  )
}

export default Navbar
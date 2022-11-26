import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, password)
  }

  return (
    <div className="login-div">
    <form className="login-form" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <br />
        <div>
          <label>Email address:</label>
          <input 
            required
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            />
        </div>
        <br /><br />
        <div>
        <label>Password:</label>
        <input 
          required
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          />
        </div>
        <br /><br />
        <div className="button">
          <button>Log in</button>
        </div>
      </form>
    </div>

  )
}

export default Login
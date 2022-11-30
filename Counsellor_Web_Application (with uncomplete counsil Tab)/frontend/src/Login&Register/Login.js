import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const exist = localStorage.getItem('User')
    if(exist)
    {
      localStorage.removeItem('User')
    }
    await login(email, password)
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
          <button disabled={isLoading}>Log in</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>

  )
}

export default Login
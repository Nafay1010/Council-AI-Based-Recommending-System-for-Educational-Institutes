import { useEffect } from "react"
import { useUserContext } from "../hooks/useUserContext"
import {useAuthContext} from '../hooks/useAuthContext'


const Navbar = () => {
  const { users, dispatch } = useUserContext()
  const {user} = useAuthContext()
  const {email} = JSON.parse(localStorage.getItem('User')) 
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/home' + email, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      
      if (response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    }

    if(user){
      fetchUsers()
    }
    fetchUsers()
  }, [dispatch, user, email])
  return (
    <nav className="navbar">
          {users && users.map(item=>(
            <h5>{item.fullname}</h5>
          ))}
    </nav>
  );
}
 
export default Navbar;
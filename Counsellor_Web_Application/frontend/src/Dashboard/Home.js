import { useEffect } from "react"
import { useUserContext } from "../hooks/useUserContext"
import {useAuthContext} from '../hooks/useAuthContext'

// components

const Home = () => {
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

  // console.log(users);
  return (
    <div className="home">
      <div className="workouts">
        {users &&  users.map(item => (
        <ul key={item._id}>
          <h4>Personal Information</h4>
          <li>Full Name: {item.fullname}</li>
          <li>Email: {item.email}</li>
          <li>CNIC: {item.CNIC}</li>
          <li>Gender: {item.gender}</li>
          <li>Date Of Birth: {item.DOB}</li>
          <li>Nationality: {item.Nationality}</li>
          <h4>Contact Information</h4>
          <li>Contact Number: {item.ContactNo}</li>
          <li>Exact Home Address: {item.HomeAddress}</li>
          <h4>Family Information</h4>
          <li>Father's Name: {item.FatherName}</li>
          <li>Father's CNIC: {item.FatherCNIC}</li>
          <li>Fathers Contact No: {item.FatherContactNo}</li>
        </ul>
        ))}
      </div>
    </div> 
  )
}

export default Home
import {useState} from 'react'
import { useEffect } from "react"
import { useUserContext } from "../hooks/useUserContext"
import {useAuthContext} from '../hooks/useAuthContext'

const Counsil = () => {
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

    const [budget, setBudget] = useState('')
    const [interest, setInterest] = useState('')
    const [study_group, setStudy_group] = useState('')
    const [fileData, setfileData] = useState()
       

    const fileChangeHandler = (e) =>{
        setfileData(e.target.files[0]);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const CNIC = String(users.map(item=>(item.CNIC)))
        const data = new FormData()
        data.append('image', fileData)
        data.append('data', JSON.stringify({budget, interest, study_group, CNIC}))
        fetch('http://localhost:4000/single', {
            method: "POST",
            body: data
        })
        .then((result) =>{
            console.log("FILE SENT SUCCESSFULLY");
        }) 
        .catch((err) =>{
            console.log(err.messsage);
        })
    }
    return ( 
        <div className="counsil-content">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <fieldset className='counsil-field'>
                <h1>Get Recommendation</h1>
                <div className="field">  
                <label>Budget</label>
                <br /><br />
                <input type="number" 
                required
                name='budget'
                value={budget}
                placeholder="Enter Max Amount of Budget..."
                onChange={e=>setBudget(e.target.value)}
                />
                <br /><br />
                <label>Interest</label>
                <br /><br />
                <input type="text" 
                required
                name='interest'
                placeholder='Few Phrases describing your Interest...'
                value={interest}
                onChange={e=>setInterest(e.target.value)}
                />
                <br /><br />
                <label>Study Group</label>
                <br /><br />
                <input type="text" 
                required
                name='study_group'
                value={study_group}
                placeholder="Computer Science, Engr etc..."
                onChange={e=>setStudy_group(e.target.value)}
                />
                <br /><br />
                <label htmlFor="file">Upload Transcript</label>
                <br /><br />
                <input type="file"
                name='file'
                onChange={fileChangeHandler}
                className="file-input"
                />
                <br /><br />
                <div className="btn">
                <button>Submit</button>
                </div>
                </div>
              </fieldset>
            </form>

        </div>
     );
}
 
export default Counsil;
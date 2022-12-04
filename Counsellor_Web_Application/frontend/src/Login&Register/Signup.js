import { useState } from 'react';
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [formval, setFormval] = useState({
    email : '',
    password : '' ,
    fullname: '',
    CNIC: '',
    DOB: '',
    gender: '',
    Nationality: '',
    HomeAddress: '',
    ContactNo: '',
    FatherName: '',
    FatherCNIC: '',
    FatherContactNo: ''
  });
  const {signup, error, isLoading, success} = useSignup()
  function handleChange(event){
    const {name, value} = event.target;  
    setFormval(prevFormval => {
      return {
        ...prevFormval,
        [name] : value
      }
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    console.log("At signup: ", formval);
    await signup(formval)
  }
  
  return ( 
    <div className='signup-div'>
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Registration</h1>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <br />
          <input
          // required
          type="text" 
          name='fullname'
          value={formval.fullname}
          onChange={handleChange}/>
        </div>
        <div>   
          <label htmlFor="CNIC">CNIC</label>
          <br />
          <input
          // required
          type="text" 
          name='CNIC'
          value={formval.CNIC}
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="DOB">Date of Birth</label>
          <br />
          <input
          // required
          type="Date" 
          name='DOB'
          value={formval.DOB}
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="Nationality">Nationality</label>
          <br />
          <input
          // required
          type="text" 
          name='Nationality'
          value={formval.Nationality}
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="ContactNo">Contact No.</label>
          <br />
          <input
          // required
          type="text" 
          name='ContactNo'
          value={formval.ContactNo}
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="FathersName">Father's Name</label>
          <br />
          <input
          // required
          type="text" 
          name='FatherName'
          value={formval.FatherName}
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="FatherCNIC">Father's CNIC</label>
          <br />
          <input
          // required
          type="text" 
          name='FatherCNIC'
          value={formval.FatherCNIC}
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="FatherContactNo">Father's Contact No.</label>
          <br />
          <input
          // required
          type="text" 
          name='FatherContactNo'
          value={formval.FatherContactNo}
          onChange={handleChange}/>
        </div>
        <div>
          <legend>Home Address</legend>
          <textarea 
          // required
          name='HomeAddress'
          value={formval.HomeAddress}
          onChange={handleChange}
          />
        </div>
        <div className="Gender">   
          <legend>Gender</legend>
          <select 
          // required
          id="gender"
          name='gender'
          onChange={handleChange}
          value={formval.gender}>
            <option value="">--Choose--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Prefer Not To Tell</option>
          </select>
        </div>
          <div className='email'>
          <fieldset>
          <label htmlFor='email'>Enter Your New Email</label>
          <br />
          <input
          // required
          type="email" 
          name='email'
          value={formval.email}
          onChange={handleChange}/>
          </fieldset>
        </div>
        <div className='password'>
          <fieldset>
          <label htmlFor="password">Enter Your New Password</label>
          <br />
          <input
          // required
          type="password" 
          name='password'
          value={formval.password}
          onChange={handleChange}/>
          </fieldset>
        </div>
        <div className="button">
         <button disabled={isLoading}>Sign up</button>
          {success ? <div className='success'>{success}</div> : error && <div className='error'>{error}</div>}
        </div>
      </form>
    </div>
   );
}
 
export default Signup;
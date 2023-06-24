import './Signup.css'
import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import {useSignup} from '../../hooks/useSignup'
import Add from "../../img/addAvatar.png";


export default function Signup() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [displayName,setName]=useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const {signup,isPending,error}=useSignup()

    const handleClick = async (e) => {
      e.preventDefault();
    
      signup(email, password, displayName,profilePicture);
    };
  return (
    <form className='signup-form' >
      <div className='signup-content'>

        <h2>Signup</h2>
        <label >
            <span>Username:</span>
            <input type="text"
            onChange={(e)=>setName(e.target.value)} value={displayName}/>
        </label>
        <label >
            <span>Email:</span>
            <input type="email" 
            onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </label>
        <label >
            <span>Password:</span>
            <input type="password"
            onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </label>
        <label htmlFor="file">
        <input required style={{ display: "none" , cursor: "pointer" }} 
        type="file" id="file"
        onChange={(e) => setProfilePicture(e.target.files[0])}
          />
            <img src={Add}  style={{ cursor: "pointer" }} alt="" />
            <span>Add an avatar</span>
          </label>
        
        {!isPending && <button className='btn' onClick={handleClick}> Signup</button>}
        {isPending && <p>Loading</p>}
        {error && <p>{error}</p>}
        <p>Already have an account <br/>
          <Link to="/login">Login</Link>

        </p>
        

            </div>
    </form>
  )
}

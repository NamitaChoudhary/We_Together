import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'

export default function Register() {
  
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const navigate=useNavigate();

    const handleClick=async(e)=>{
           
        e.preventDefault();

        if(passwordAgain.current.value!==password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match")
        }else{

            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }

            try{

                  await axios.post('/auth/register',user);
                  navigate('/login');

                

            }catch(err)
            {
               console.log(err);
            }
          
        }

    }
    

  return (
      <div className="login">
          <div className="loginWrapper">
              <div className="loginleft">
                 <h3 className="loginLogo">WeTogether</h3>
                 <span className="loginDesc">Lorem ipsum dolor, sit amet consectetur </span>

              </div>
              <div className="loginright">
                   <form className="loginBox" onSubmit={handleClick}>
                   <input placeholder='Username'  required  ref={username} className="loginInput" />
                      <input placeholder='Email' type='email' required ref={email} className="loginInput" />
                      <input placeholder='Password' type='password' required ref={password}  className="loginInput"  minLength={6}/>
                      <input placeholder='Password Again' type='password' required  ref={passwordAgain} className="loginInput" />
                     

                      <button className="loginButton" type='submit'>Sign Up</button>
                  
                      <button className="loginRegisterButton">Log into Account</button>
                   </form>
              </div>
          </div>
      </div>
  )
}

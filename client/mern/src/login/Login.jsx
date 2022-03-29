import React,{useContext, useEffect, useRef} from 'react';
import './login.css'
import  {loginCall} from '../apiCalls'
import { AuthContext } from '../context/AuthContext';
import { CircularProgress } from '@material-ui/core';

export default function Login() {

    const email=useRef();
    const password=useRef();
    const {user,isfetching,error,dispatch}=useContext(AuthContext);

   const handleClick=(e)=>{
        
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }
   
   

  console.log(user);


  return (
      <div className="login">
          <div className="loginWrapper">
              <div className="loginleft">
                 <h3 className="loginLogo">WeTogether</h3>
                 <span className="loginDesc">Lorem ipsum dolor, sit amet consectetur </span>

              </div>
              <div className="loginright">
                   <form className="loginBox"  onSubmit={handleClick}>
                      <input placeholder='Email'  className="loginInput" type="email"  ref={email} required />
                      <input placeholder='Password' type="password"  className="loginInput" ref={password} required minLength={6}/>

                      <button className="loginButton" type='submit' disabled={isfetching}>
                          {isfetching?(<CircularProgress color='primary' size="20px"/> )
                          :('Log In')}
                          </button>
                      <span className="loginForgot">Forgot Password?</span>
                      <button className="loginRegisterButton">
                      {isfetching?(<CircularProgress color='primary' size="20px"/>) 
                      :('Create a New Account')}
                     
                      </button>
                   </form>
              </div>
          </div>
      </div>
  )
}

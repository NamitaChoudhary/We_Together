import Login from "./login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Register from "./register/Register";
import {Route,Routes,Navigate} from 'react-router-dom'
import { useContext,useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Thread from "./pages/thread/Thread";
import { io } from "socket.io-client";
import {socketCall} from './apiCalls'

function App() {
  
  const {user,socket,dispatch}=useContext(AuthContext);
 


  console.log(user);
  
  useEffect(()=>{
    
    const socket=io("http://localhost:5000");

     socketCall(socket,dispatch);
    

    

  },[user])
  

  useEffect(()=>{
    console.log(socket);
    socket?.emit("newUser",user);

  },[socket,user])
 

 



  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(user));
},[user])



  return (
  
    <>
  
   <Routes>
       <Route exact path='/' element={user?<Home />:<Register/>}/>
       <Route  path='/login' element={user ? <Navigate replace to='/'/>:<Login/>}/>

       <Route  path='/register' element={user ? <Navigate replace to='/'/>:<Register/>}/>
       <Route  path='/profile/:userId' element={<Profile/>}/>
       <Route  path='/thread/:postId' element={<Thread/>}/>
   </Routes>
    
   </>

   
    
  );
}

export default App;

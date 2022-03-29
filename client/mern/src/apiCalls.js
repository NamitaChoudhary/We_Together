import axios from "axios";
import { io } from "socket.io-client";

export const loginCall=async(userCredentials,dispatch)=>{
    dispatch({type:'LOGIN_START'});

    try{
       
        const res=await axios.post('auth/login',userCredentials);
        dispatch({type:'LOGIN_SUCCESS',payload:res.data});
         
    }catch(err){
        dispatch({type:'LOGIN_FAILURE',payload:err});
    }

}

export const socketCall=async(socket,dispatch)=>{
    
    
   console.log(socket);
    dispatch({type:'SOCKET',payload:socket});

}
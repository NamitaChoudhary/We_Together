import React,{useContext, useState,useEffect} from 'react';
import Toolbar from '../../components/toolbar/Toolbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar';
import './profile.css'
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import axios from 'axios'





export default function Profile() {
  
 
  
  const {userId}=useParams();

  const [user,setUser]=useState({});

   useEffect(()=>{
       
     const getUser=async()=>{

      const res=await axios.get(`/users/${userId}`);
      console.log(res.data);
      setUser(res.data)
  }
  
  getUser();
        
      
   },[userId])

 



  return (
    <>
    <Toolbar/>
    <div className='profile'>
      <Sidebar/>
     
     <div className="profileRight">
         <div className="profileRightTop">
             <div className="profileCover">
               {user?.coverPicture?( <img className='profileCoverImg' src={user.coverPicture} alt=""/>)
               :( <img className='profileCoverImg' src="https://firebasestorage.googleapis.com/v0/b/wetogether-191fc.appspot.com/o/default-cover.jpg?alt=media&token=15c512ec-a7d0-4716-9394-f97ac326b39a" alt=""/>)}   
               {user?.profilePicture ?(   <img className='profileUserImg' src={user.profilePicture} alt=""/>)
               :(   <img className='profileUserImg' src="https://firebasestorage.googleapis.com/v0/b/wetogether-191fc.appspot.com/o/default-img-2-1.jpg?alt=media&token=5ca88c66-bcbf-49ad-ae41-738a09810885" alt=""/>)}
          
             </div>
             <div className="profileInfo">
                 <h4 className="profileInfoName">{user.username}</h4>
                 <span className="profileInfoDesc">Hello everyone</span>
             </div>
            
         </div>
         <div className="profileRightBottom">
         <Feed userId={userId}/>
        <Rightbar  user={user}/>
         </div>
        
     </div>
     </div>
     

   
</>
  )
}

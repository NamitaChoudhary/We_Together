import React, { useContext ,useEffect,useState} from 'react';
import './toolbar.css'
import {Search,Person,Chat,Notifications} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function Toolbar() {
  
  const {user,socket}=useContext(AuthContext);
  const [notifications,setNotifications]=useState([]);
  const [open,setOpen]=useState(false);
  
  useEffect(()=>{
     
     socket?.on("getNotification",data=>{
            setNotifications(prev=>[...prev,data])
     })

  },[socket]);

  console.log(notifications);
  
  const displayNotification=({senderUser,type},i)=>{
    
    
    
    
    let action;
    if(type===1)
    {
       action="liked"
    }else 
    {
      action="commented on"
    }

  
     
     return <span className='notification' key={i} >{`${senderUser.username} ${action} your post`}</span>
    


   
  }
  const handleClick=()=>{
     
     setNotifications([]);
  }
  

  return (
     
    <div className='toolbarContainer'>
           <div className='toolbarleft'>
             <Link to="/" style={{textDecoration:'none'}}> 
             <span className='logo'>WeTogether</span> 
             </Link>
            
             
           </div>
           <div className='toolbarCenter'>
               <div className='searchbar'>
                    <Search className='searchIcon'/>
                    <input placeholder='Search...' className='searchInput'/>
               </div>
           </div>
           <div className='toolbarright'>
               <div className='toolbarLinks'>
               <span className='toolbarLinks'>Homepage</span>
               <span className='toolbarLinks'>Timeline</span>
               </div>
               <div className='toolbarIcons'>
                   <div className='toolbarIconItem'>
                    <Person/>
                    <span className='toolbarIconBadge'>1</span>
                   </div>
                   <div className='toolbarIconItem'>
                    <Chat/>
                    <span className='toolbarIconBadge'>2</span>
                   </div>
                   <div className='toolbarIconItem'>
                    <Notifications onClick={()=>setOpen(!open)}/>
                    {
                      notifications.length >0 &&  <span className='toolbarIconBadge'>{notifications.length}</span>
                    }
                   
                   </div>
                   
               </div>
               {
                 open && (
                  <div className='notifications'>
                  {
                    notifications.map((n,i)=>displayNotification(n,i))
                  }
                  <button  className='nButton' onClick={handleClick}>Mark as read</button>
                </div>
                 )
               }


               
                  <Link to={`profile/${user._id}`} style={{textDecoration:'none'}}> 
                {user?.profilePicture?(<img src={user.profilePicture} alt="" className='toolbarImg'/>)
                :(<img src="https://firebasestorage.googleapis.com/v0/b/wetogether-191fc.appspot.com/o/default-img-2-1.jpg?alt=media&token=5ca88c66-bcbf-49ad-ae41-738a09810885" alt="" className='toolbarImg'/>)}
               </Link>

           </div>
    </div>

  )
}

export default Toolbar;

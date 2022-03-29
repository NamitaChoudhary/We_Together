import React, { useContext } from 'react';
import './sidebar.css'
import {Container, Grid,Item, Tooltip, Typography} from '@material-ui/core'
import { RssFeed } from '@material-ui/icons';
import { AuthContext } from '../../context/AuthContext';





export default function Sidebar() {
  
  const {user}=useContext(AuthContext);
   console.log(user);
  



  return (
  <div className='sidebar'>
    <div className='sidebarWrapper'>
    <Grid>
    <Grid container spacing={0} alignItems='center' justifyContent='center'> 
     
     {user?.profilePicture?(  <img src={user.profilePicture} alt="" className='ProfileImage'/>)
     :(  <img src="https://firebasestorage.googleapis.com/v0/b/wetogether-191fc.appspot.com/o/default-img-2-1.jpg?alt=media&token=5ca88c66-bcbf-49ad-ae41-738a09810885" alt="" className='ProfileImage'/>)}
       
      
        
   </Grid>
   
   <Typography variant="h5" gutterBottom align='center'>
      {user.username}
  </Typography>

    <Grid container spacing={3} alignItems='center' justifyContent='center'>
      <Grid item>
      <Typography variant='h6' gutterBottom>{user.followers.length} followers</Typography>
      </Grid>
      <Grid item >
      <Typography variant='h6' gutterBottom>{user.following.length} followings</Typography>
      </Grid>
      
    </Grid>
  
  </Grid>
 
   
    </div>
    <div className='sidebarWrapper'>
      
       
       <hr className='sidebarHr'/>
    </div>
  </div>
  )
}

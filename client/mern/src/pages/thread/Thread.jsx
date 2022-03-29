import React, { useEffect } from 'react';
import Toolbar from '../../components/toolbar/Toolbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar';

import './thread.css'
import ThreadFeed from '../../components/threadfeed/ThreadFeed';
import { useParams } from 'react-router-dom';


function Thread() {
  
 const {postId}=useParams();
 


  return(
     <>
      <Toolbar/>
      <div className='threadContainer'>
        <div className='threadWrapper'>
          
          
         <ThreadFeed postId={postId}/>
        </div>
      
       
      </div>
     </>
  )
}

export default Thread;

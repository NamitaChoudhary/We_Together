import axios from 'axios';
import React, { useContext } from 'react';
import { useRef } from 'react';
import {AuthContext} from '../../context/AuthContext'

import './threadshare.css'

function ThreadShare({postId}) {

    const {user}=useContext(AuthContext);
    const desc=useRef();

    
    const SubmitHandler=async(e)=>{

        e.preventDefault();
        const newThread={
            userId:user._id,
            postId:postId,
            desc:desc.current.value
       }

       try{
            
           const thread= await axios.post('/posts/thread',newThread);
            await axios.put('/posts/thread/'+postId,thread.data);

            console.log('thread created');
            window.location.reload();

       }catch(err){
           console.log(err);
       }
        

    }


  return (
      <>
        <div className='threadshare'>
         <div className="shareWrapper">
             <div className="shareTop">
             {user?.profilePicture?( <img className='shareProfileImg' src={user.profilePicture} alt=""/>)
               :( <img className='shareProfileImg' src="https://firebasestorage.googleapis.com/v0/b/wetogether-191fc.appspot.com/o/default-img-2-1.jpg?alt=media&token=5ca88c66-bcbf-49ad-ae41-738a09810885" alt=""/>)} 
                 <textarea
                  placeholder='Write a thread....' 
                   className='threadshareInput'
                   rows={4}
                   cols={80}
                   ref={desc}
                  
                   />
             </div>
             <hr className='shareHr'/>
             <form className="shareBottom"  onSubmit={SubmitHandler} >
                 
                 <button className='threadshareButton' type='submit' >Share</button>
             </form>
         </div>
      </div>
      </>
  )
}

export default ThreadShare;

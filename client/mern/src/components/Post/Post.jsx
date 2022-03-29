import React, { useState,useEffect, useContext, useRef } from 'react';
import './post.css'
import {MoreVert,ThumbUp,Create} from '@material-ui/icons'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { io } from "socket.io-client";
import { AuthContext } from '../../context/AuthContext';








function Post({post}) {

  const [like,setLike]=useState(post.likes.length);
  const [isLiked,setIsLiked]=useState(false);
  const [user,setUser]=useState({});
  const {user:currentUser}=useContext(AuthContext);
  const [showpost,setShowpost]=useState(false);
  const postRef=useRef(null);
  const {socket}=useContext(AuthContext);

 
    const observer=React.useRef(new IntersectionObserver((entries)=>{
        const first=entries[0];
          if(first.isIntersecting)
          {
            setShowpost(true);
           
          }
         
        },{threshold:1}
    )
    );
  


  const likeHandler=(type)=>{
    try{

        axios.put('/posts/'+post._id+'/like',{userId:currentUser._id});

    }catch(err){

    }


      setLike(isLiked?like-1:like+1);
      if(!isLiked)
      {
         socket?.emit("sendNotification",{
             senderUser:currentUser,
             receiverUser:user,
             type,
         })
      }
      setIsLiked(!isLiked);
  }

  useEffect(()=>{
      setIsLiked(post.likes.includes(currentUser._id));
  },[currentUser._id,post.likes])

  useEffect(()=>{
        
    const fetchUser=async()=>{
        const res= await axios.get(`/users/${post.userId}`);
        // console.log(res);
        setUser(res.data)
       
    };

    fetchUser();
 

},[post.userId])

useEffect(()=>{
      
   
   const currentObserver=observer.current;
//    console.log(currentObserver);
    //  registerObserver(postRef.current,setShowpost)
   
    if(postRef.current)
    {
        // console.log(postRef);
        currentObserver.observe(postRef.current)
    }

    return ()=>{
        if(postRef.current)
        {
            // console.log(postRef);
            currentObserver.unobserve(postRef.current)
        }
    };
   
},[]);

if(showpost)
 {
    // console.log(post.desc)
     return (
      <div className='post' >
          <div className="postWrapper">
              
             <div className="postTop">
                 <div className="postTopleft">
                   {post?.profilePicture ? 
                   (<Link to={`/profile/${user.username}`} style={{textDecoration:'none'}}><img  className="postProfileImg" src={user.profilePicture} alt=""/></Link>)
                   : (<Link to={`/profile/${user.username}`} style={{textDecoration:'none'}}><img  className="postProfileImg" src='https://firebasestorage.googleapis.com/v0/b/wetogether-191fc.appspot.com/o/default-img-2-1.jpg?alt=media&token=5ca88c66-bcbf-49ad-ae41-738a09810885' alt=""/></Link>)}
                     <span className='postUserName'>{user.username}</span>
                     <span className='postDate'>{format(post.createdAt)}</span>
                 </div>
                 <div className="postTopright">
                     <MoreVert/>
                 </div>
             </div>
             <div className="postCenter">
                 <span className="postText">{post?.desc}</span>
                { post.img && (<img  className="postImg" src={post.img} alt="" />)}
             </div>
             <div className="postBottom">
                 <div className="postBottomLeft">
                     <ThumbUp className='LikeIcon' onClick={()=>likeHandler(1)} />
                     <span className="postLikeCounter">{like} people liked it</span>
                 </div>
                 <div className="postBottomRight">
                    <Link to={`/thread/${post._id}`} style={{textDecoration:'none'}}> <Create  onClick={()=>likeHandler(2)} /></Link>
                     
                     <span className="postCommentText" style={{textDecoration:'none'}}>{post.comment} comments</span>
                 </div>
             </div>

            </div> 
      </div>
  )
                   }
  return(
      <div className='lazyPost' ref={postRef}>
          <span className="postImg"></span>
      </div>
  )
                   
 
}

export default Post;

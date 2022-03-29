import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './rightbar.css'
import {Add, Remove} from '@material-ui/icons'


function Rightbar({user}) {

    const [friends,setFriends]=useState([]);
    const {user:currentUser,dispatch}=useContext(AuthContext);
    const [followed,setFollowed]=useState(currentUser.following.includes(user?._id));
    console.log(followed);


  console.log(user);

    useEffect(()=>{
        const getFriends=async ()=>{
            try{
                
                const friendList=await axios.get("/users/friends/"+user._id);
                console.log(friendList.data);
                setFriends(friendList.data);

            }catch(err){
                console.log(err);
            }
        }
       if(user)
        getFriends();
    },[user?._id])

    const handleClick=async()=>{
         
        try{
            if(followed)
            {
                await axios.put("/users/"+user._id+"/unfollow",{
                    userId:currentUser._id,
                });
                dispatch({type:'UNFOLLOW',payload:user._id})
            }else{
                await axios.put("/users/"+user._id+"/follow",{
                    userId:currentUser._id
                });
                dispatch({type:'FOLLOW',payload:user._id})
            }

        }catch(err){
            console.log(err);
        }

        setFollowed(!followed);

    }

  const HomeRightBar=()=>{

    return (
        <>
        <span className='Notification'>HighLights</span>
         <div className="highlightsContainer">
             <ul className='highlighList'>
             <li>
            <span className='highlights'>hgdhs</span>
            </li>
            <li>
            <span className='highlights'>hgdhs gjhzgf hzgfhjgfjs hzsgfjgfjs hgfgsdfjdvgcvzxgcvzxvcbzx gsdvfhsghfgshf hgfhgsh hsgfhs</span>
            </li>
            <li>
            <span className='highlights'>hgdhs</span>
            </li>
            <li>
            <span className='highlights'>hgdhs</span>
            </li>
            <li>
            <span className='highlights'>hgdhs</span>
            </li>
            <li>
            <span className='highlights'>hgdhs</span>
            </li>
           
            </ul>
         </div>
        </>
    )

  }

  const ProfileRightBar=()=>{
      return (
          <>
          
          {user.username!==currentUser.username && (
              <button className="rightbarFollowBtn" onClick={handleClick}>
                 {followed?"Unfollow":"Follow"}
                 {followed?<Remove/>:<Add/>}
              </button>
          )}


           <h4 className='rightbarTitle'>User Information</h4>
           <div className='rightbarInfo'>
              <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">City:</span>
                  <span className="rightbarInfoValue">New York</span>
              </div>
           </div>
           <h4 className='rightbarTittle'>User friends</h4>
           <div className="rightbarFollowings">

               {friends.map(friend=>(
                   <Link to={"/profile/"+friend._id} style={{textDecoration:'none'}}>
                   <div className="rightbarFollowing">
                   <img src={friend.profilePicture? friend.profilePicture:'https://firebasestorage.googleapis.com/v0/b/wetogether-191fc.appspot.com/o/default-img-2-1.jpg?alt=media&token=5ca88c66-bcbf-49ad-ae41-738a09810885'} alt="" className="rightbarFollowingImg" />
                   <span className="rightbarfollowingName">{friend.username}</span>
               </div>
               </Link>
               ))
               }
               
               
           </div>
          </>
      )
  }


  return (
  <div className={user?'rightbar1':'rightbar'}>
     <div className="rightbarWrapper">
         {user? <ProfileRightBar/>:<HomeRightBar/>}
     </div>
  </div>
  )
}

export default Rightbar;

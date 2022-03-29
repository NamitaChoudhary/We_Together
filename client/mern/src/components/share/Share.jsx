import React, { useContext, useEffect, useRef, useState } from 'react';
import {PermMedia,Label,Room,EmojiEmotions,PictureAsPdf, Cancel} from '@material-ui/icons'
import './share.css'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import firebase from '../../firebase';
import {v4 as uuidv4} from 'uuid'


function Share() {

  const {user}=useContext(AuthContext);
  const desc=useRef();
  const [file,setFile]=useState(null);
  const [mainfile,setMainfile]=useState(null);
  const [files,setFiles]=useState([]);

  useEffect(()=>{
   
    if(mainfile!==null && mainfile!==undefined)
     {
         console.log(mainfile);
         submitPost();
     }

  },[mainfile])
 

  const uploadFile=()=>{
    const metadata ={
        contentType:'image/jpeg'
    }
    const storageRef=firebase.storage().ref();
    storageRef
     .child(`images/${uuidv4()}.jpeg`)
     .put(file,metadata)
     .then(snap=>{
         snap.ref.getDownloadURL().then(downloadURL=>{

             setMainfile(downloadURL)
    
         })
     
     })
  }

  const submitPost=async()=>{

  
      const newPost={
        userId:user._id,
        desc:desc.current.value,
        
      }
      if(file)
      {
          newPost['img']=mainfile;
      }
      try{
       
        await axios.post('/posts',newPost);
        
        window.location.reload();
  

    }catch(err){
        console.log(err);
    }

  }


  const submitHandler=async(e)=>{
    
      e.preventDefault()
      if(file)
      {
          console.log(file);
          uploadFile()
         
      }
      else
      {
          submitPost();
      }

      

  }




  return (
      <div className='share'>
         <div className="shareWrapper">
             <div className="shareTop">
               {user?.profilePicture?( <img className='shareProfileImg' src={user.profilePicture} alt=""/>)
               :( <img className='shareProfileImg' src="https://firebasestorage.googleapis.com/v0/b/wetogether-191fc.appspot.com/o/default-img-2-1.jpg?alt=media&token=5ca88c66-bcbf-49ad-ae41-738a09810885" alt=""/>)} 
                 <input
                  placeholder='Ask Queries Or Post your Content...' 
                   className='shareInput'
                   ref={desc}
                   />
             </div>
             <hr className='shareHr'/>
            {
                file&& (
                    <div className="shareImgContainer">
                        <img className='shareImg' src={URL.createObjectURL(file)} alt=''/>
                        <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
                    </div>
                )
            }

             <form className="shareBottom"  onSubmit={submitHandler} >
                 <div className="shareOptions">
                     <label  htmlFor='file' className="shareOption">
                         <PermMedia htmlColor='tomato' className='shareIcon'/>
                         <span className='shareOptionText'>Photo or Video</span>
                         <input style={{display:'none'}} type='file' id='file' accept='.png,.jpg,.jpeg' onChange={(e)=>setFile(e.target.files[0])} />
                     </label>
                     <div className="shareOption">
                         <Label htmlColor='blue' className='shareIcon'/>
                         <span className='shareOptionText'>Add a Tag </span>
                     </div>
                     <label htmlFor='pdf' className="shareOption">
                         <PictureAsPdf htmlColor='green' className='shareIcon'/>
                         <span className='shareOptionText'>Pdf or Files</span>
                         <input style={{display:'none'}} type='file' id='pdf' accept='.pdf,.txt,' onChange={(e)=>setFile(e.target.files[0])} />
                     </label>
                     <div className="shareOption">
                         <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                         <span className='shareOptionText'>Emotions</span>
                     </div>
                 </div>
                 <button className='shareButton' type='submit'>Share</button>
             </form>
         </div>
      </div>
  )
}

export default Share;

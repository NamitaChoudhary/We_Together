import React,{useEffect,useState} from 'react';
import ThreadShare from '../threadshare/ThreadShare';
import Post from '../../components/Post/Post'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ThreadFeed({postId}) {
   

  const [post,setPost]=useState();
  const [threads,setThreads]=useState([]);
  console.log(postId);

  useEffect(()=>{
     
    const getPost=async(req,res)=>{
         
     const mainpost= await axios.get('/posts/'+postId);
    setPost(mainpost.data);
    setThreads(mainpost.data.threads);
      console.log(mainpost.data.threads);
    }
    getPost();

  },[postId])

  



  return(
      <>
       <div className='feed'>
          <div className='feedWrapper'>
           
            {
              post? (<Post key={post._id} post={post}/>):''
            }
             <ThreadShare postId={postId}/>
             {
               threads.length>0 && threads.map(p=>(
                <Post  key={p._id} post={p}/>
               ))
             }
            
          </div>
      </div>
      </>
  )
}

export default ThreadFeed;

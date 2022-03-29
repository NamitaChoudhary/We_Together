
import React, { useContext, useEffect, useState,useRef } from 'react';
import Post from '../Post/Post';
import Share from '../share/Share'
import './feed.css'
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext";

const PAGE_NUMBER=1;


export default function Feed({userId}) {
  
    const [posts,setPosts]=useState([]);
    const [page,setPage]=useState(PAGE_NUMBER);
    const {user}=useContext(AuthContext);

    

   const scrollToEnd=()=>{
          setPage(page+1);
    }

    window.onscroll=function(){
        //check if the page has scrolled to the bootom
    //  console.log( Math.floor(window.innerHeight + document.documentElement.scrollTop));
    //  console.log(document.documentElement.offsetHeight);
        if(
            
            Math.floor(window.innerHeight + document.documentElement.scrollTop)
            === document.documentElement.offsetHeight
        ){
            console.log('end');
            scrollToEnd();
        }
    }
  

    useEffect(()=>{
        
        const fetchPost=async()=>{
            const res= userId?
            await axios.get("/posts/profile/"+userId+`?page=${page}&limit=3`)
            : await axios.get(`/posts/timeline/61f2838c90ab7cf2d98b0d82?page=${page}&limit=3`);
           

            setPosts([...posts,...res.data]);
        };

        fetchPost();
     

    },[userId,page])


  return (
      <div className='feed'>
          <div className='feedWrapper'>
           {(user._id===userId || !userId)?<Share/>:null}  
            {
               posts.length >0 && posts.map(p=>(
                    <Post  key={p._id} post={p}/>
                ))
            }
          </div>
      </div>
  )
}



const router=require('express').Router();
const Post=require("../models/Post");
const User = require('../models/User');
const Thread=require('../models/Thread')



//create a post
router.post("/",async(req,res)=>{

    const newPost= new Post(req.body);

    try{
        
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);

    }catch(err){
       
        
        res.status(500).json(err);
    }
});




//update a post
router.put("/:id",async(req,res)=>{

    const post= await Post.findById(req.params.id);
   
    try{
        if(post.userId===req.body.userId){

            await post.updateOne({$set:req.body});
            res.status(200).json("post have been updated");

       }else{

        res.status(403).json("you can update only your post");

       }

   }catch(err){
       res.status(500).json(err);
   }

})



//delete a post
router.delete("/:id",async(req,res)=>{

    const post= await Post.findById(req.params.id);
   
    try{
        if(post.userId===req.body.userId){

            await post.deleteOne();
            res.status(200).json("post have been deleted");

       }else{

        res.status(403).json("you can delete only your post");

       }

   }catch(err){
       res.status(500).json(err);
   }

})



//like/dislike a post
router.put("/:id/like",async(req,res)=>{

    const post=await Post.findById(req.params.id);
    try {
        
      if(!post.likes.includes(req.body.userId)){
          await post.updateOne({$push:{likes:req.body.userId}});
          res.status(200).json("The post has been liked");
      }else
      {
          await post.updateOne({$pull:{likes:req.body.userId}});
          res.status(200).json("The post has been disliked");
      }

    } catch (err) {
        res.status(500).json(err);
    }
})

//get a post
router.get("/:id",async(req,res)=>{
    try{

        const post=await Post.findById(req.params.id);
        res.status(200).json(post);

    }catch(err){
        res.status(500).json(err);
    }
})

//get timeline posts

router.get("/timeline/:userId",async(req,res)=>{
     
    const page=req.query.page;
    const limit=req.query.limit;
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;

    
    try{
     
      
     const currentUser=await User.findById(req.params.userId);
     const userPosts=await Post.find({userId:currentUser._id});
     const friendPosts=await Promise.all(
         currentUser.following.map((friendId)=>{
            return Post.find({userId:friendId});
         })
     );
     userPosts.concat(...friendPosts);
    userPosts.sort((p1,p2)=>{
        return  new Date(p2.createdAt)-new Date(p1.createdAt)
    })
    const result= userPosts.slice(startIndex,endIndex);

     res.json(result);

    }catch(err){
       res.status(500).json(err);
    }
})

// get user's all post
router.get("/profile/:userId",async(req,res)=>{

    const page=req.query.page;
    const limit=req.query.limit;
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    try{
     
      
       const posts= await Post.find({userId:req.params.userId});
       
       posts.sort((p1,p2)=>{
        return  new Date(p2.createdAt)-new Date(p1.createdAt)
    })

      const result= posts.slice(startIndex,endIndex);
       res.status(200).json(result)

    }catch(err){
       res.status(500).json(err);

    }
})



// create a thread

router.post('/thread',async(req,res)=>{

     const newthread=new Thread(req.body);
     
     try{

        const savedThread= await newthread.save();
        res.status(200).json(savedThread);

     }catch(err){

         res.status(500).json(err);
     }

})



//add athread to a post
router.put('/thread/:postId',async(req,res)=>{
    try{

       
        const post=await Post.findById(req.params.postId);
         await post.updateOne({$push:{threads:req.body}})
        
         res.status(200).json('thread added');



    }catch(err){
        res.status(500).json(err);
    }
})

//get thread of the post
router.get('/thread/:postId',async(req,res)=>{

    try{
        const post=await Post.findById(req.params.postId);

        const threadposts=post.threads;
        res.status(200).json(threadposts);

    }catch(err){
        res.status(500).json(err);
    }
    
    
     

})


module.exports=router;
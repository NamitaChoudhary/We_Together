// All action a user can perform, backend code

const router=require("express").Router();
const bcrypt=require("bcrypt");
const User = require("../models/User");

//update user.....
router.put("/:id",async(req,res)=>{

    // user can update the profile of itself or only admin can update others profile
    if(req.body.userId===req.params.id || req.body.isAdmin){
        
        // if updated parameter is password
        if(req.body.password){
            try{
                // hashing the password before updating
                 const salt=await bcrypt.genSalt(10);
                 req.body.password=await bcrypt.hash(req.body.password,salt);

            }catch(err){
               return res.status(500).json(err);
            }
        }

        try{
            
            // updating the user profile
            const user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,

            });

            res.status(200).json("Account has been updated");

        }catch(err){
            return res.status(500).json(err);
        }

    }else{
        return res.status(403).json("you can update only your account");
    }
});




//delete user....
router.delete("/:id",async(req,res)=>{

    // user can delete the profile of itself or only admin can delete others profile
    if(req.body.userId===req.params.id || req.body.isAdmin){
        
        
       

        try{
            
            // deleting the user profile
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json("Account has been deleted");

        }catch(err){
            return res.status(500).json(err);
        }

    }else{
        return res.status(403).json("you can delete only your account");
    }
});

//get a user.....
router.get("/:id",async(req,res)=>{
    
    try{
        // find the user with given id
          const user=await User.findById(req.params.id);

          //sending only necessary info
          const {password,updatedAt,...other}=user._doc;

          res.status(200).json(other);

    }catch(err){
         res.status(500).json(err);
    }


})


//follow a user....

router.put("/:id/follow",async(req,res)=>{
    
     //user and current user should not be same
    if(req.body.userId !== req.params.id){
        
        try{
            // user to follow
            const user=await User.findById(req.params.id);
            // current user
            const currentUser=await User.findById(req.body.userId);
           

           // user should not include the id in followers list
            if(!user.followers.includes(req.body.userId)){
               
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{following:req.params.id}});
                res.status(200).json("user has been followed");
            }
            else
            {
                res.status(403).json("you already follow this user");
            }

        }catch(err){
             
            res.status(500).json(err)
        }

    }else{
         
        res.status(403).json("you cant follow yourself");
    }
})


//unfollow a user....
router.put("/:id/unfollow",async(req,res)=>{
    
     //user and current user should not be same
    if(req.body.userId !== req.params.id){
        
        try{
            // user to follow
            const user=await User.findById(req.params.id);
            // current user
            const currentUser=await User.findById(req.body.userId);
           

           // user should  include the id in followers list
            if(user.followers.includes(req.body.userId)){
               
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{following:req.params.id}});
                res.status(200).json("user has been unfollowed");
            }
            else
            {
                res.status(403).json("you don't follow this user");
            }

        }catch(err){
             
            res.status(500).json(err)
        }

    }else{
         
        res.status(403).json("you cant follow yourself");
    }
});


//get friends 
router.get("/friends/:userId",async(req,res)=>{
    try{
        
        const user=await User.findById(req.params.userId);
        const friends=await Promise.all(
            user.following.map(friendId=>{
                return User.findById(friendId)
            })
        )

        let friendList=[];
        friends.map(friend=>{
            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture});
        })
        res.status(200).json(friendList);

    }catch(err){
        res.status(500).json(err);
    }
})



module.exports=router;
const mongoose =require("mongoose");

const ThreadSchema=new mongoose.Schema({

  userId:{
      type:String,
      required:true
  },
  postId:{
      type:String,
      required:true

  },
  desc:{
      type:String,
      max:500
  },
 
  likes:{
      type:Array,
      default:[]
  },
 

},

{timestamps:true}

);



module.exports=mongoose.model("Thread",ThreadSchema);
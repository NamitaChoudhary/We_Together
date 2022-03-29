const { Server } = require("socket.io");

const io = new Server({
    cors:{
        origin:"http://localhost:3000"
    }
 });

let onlineUsers=[];

const addNewUser=(user,socketId)=>{

    !onlineUsers.some((User)=>User._id===user._id)&&
    onlineUsers.push({user,socketId});

    console.log(user);

};

const removeUser=(socketId)=>{
    onlineUsers=onlineUsers.filter((user)=>user.socketId!==socketId);
};

const getUser=(user)=>{
    console.log(user._id);

    return onlineUsers.find((User)=>User.user._id===user._id);
    

}

io.on("connection", (socket) => {
    console.log('connected');
  
    socket.on("newUser",(user)=>{

         console.log("user connected");

        addNewUser(user,socket.id);

    });

    socket.on("sendNotification",({senderUser,receiverUser,type})=>{
       console.log(onlineUsers);
       console.log(receiverUser);
       const receiver=getUser(receiverUser);

       console.log(receiver);

        io.to(receiver?.socketId).emit("getNotification",{
            senderUser,
            
            type,

        })
    })

   socket.on("disconnect",()=>{
      removeUser(socket.id);
   })

});

io.listen(5000);
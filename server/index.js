const express=require("express")
const app=express();
const http=require("http")
const  cors=require("cors")
//server class from socket.io
const {Server}=require("socket.io")
app.use(cors())
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    },
})
//connection method detects whether if someone connected to socket server
io.on("connection",(socket)=>{
    console.log(socket.id);
    //without making the HTTP request we are sending the data from frontend to backend which is one by the feature of socket.io
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`user with id ${socket.id} joined room ${data}`)
    })

    socket.on("send_message",(data)=>{
      console.log(data)
      socket.to(data.room).emit("receive_message",data)
    })
   //disconnecting from server or closing the tab
   socket.on("disconnect",()=>{
    console.log("user disconnected")
   })

})
server.listen(3001,()=>{
    console.log("listening to server")
});
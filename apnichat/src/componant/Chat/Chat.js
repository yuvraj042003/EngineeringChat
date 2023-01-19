import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { user } from "../Join/Join";
import "./Chat.css";
import send5 from "../../Images/send3.png";

let socket;
const ENDPOINT = "http://localhost:4500";
const Chat = () => {
  const [id, setid] = useState("")
  const send = ()=>{
    const message = document.getElementById('chatInput').value;
    socket.emit('message', {message, id});
    document.getElementById('chatInput').value = "";
  }
  
  useEffect(() => {
    const socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("Connected");
      setid(socket.id);
    });
    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      console.log(data.user, data.message);
    });
    socket.on('leave',(data)=>{
      console.log(data.user, data.message);
    })
    socket.on('sendMessage', (data) =>{
    console.log(data.user, data.message, data.id);
    return () => {
      socket.on('disconnect');
      socket.off();

    }
  }, []);

  return () => {
    
  }
}, [])

  
  return (
    <>
      <div className="chatPage">
        <div className="chatContainer">
          <div className="header"></div>
          <div className="chatBox"></div>
          <div className="InputBox">
            <input type="text" id="chatInput" />
            <button onClick={send} className="sendBtn">
              <img src={send5} alt="Send" />{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
import React, { useState } from 'react'
import { useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
import './Chat.css'
import Messages from './Messages';
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Char1 from "../../img/addAvatar.png"

export default function Chat() {
  // const [messages,setMessages]= useState([]);
  // const [newMessage,setNewMessage] = useState([]);

  // useEffect(()=>{
  //   const ref= projectFirestore.collection('messages');

  //   const unsub= ref.orderBy('timestamp').onSnapshot((snapshot)=>{
  //     const updatedMessage= snapshot.docs.map((doc)=>doc.data());
  //     setMessages(updatedMessage)
  //   })

  //   return ()=> unsub();
  // },[])

  // const handleSendMessage = (e) => {
  //   e.preventDefault();

  //   const messagesRef = projectFirestore.collection('messages');

  //   messagesRef.add({
  //     sender: 'User',
  //     message: newMessage,
  //     timestamp: new Date(),
  //   });

    
  //   setNewMessage('');
  // };


  return (
    <div className='chat'>
        <div className="chatnav">
        <div className='chattop'>
          <div style={{gap:'20px', display:"flex"}}>
             <img src={Char1}  />
            <span>Name</span>
          </div>
       
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
        </div>
        <div className="messages">
            <Messages/>
        </div>
        <div className="input"> 
        <input type="text" placeholder='type something...' />
        <div className="send">
          <button>Send</button>
        </div>
    
        </div>

        {/* <div>
        <div className="chat-container">
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="sender">{message.sender}: </span>
            <span className="content">{message.message}</span>
          </div>
        ))}
      </div>
      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message"
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
        </div> */}
       

    </div>
  )
}

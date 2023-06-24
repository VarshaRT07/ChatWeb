import React from 'react'
import './Sidebar.css'
import Char1 from "../../img/addAvatar.png"

export default function Chats() {
  return (
    <div>
       <div className="userinfo">
            <img src={Char1}  />
            <div className="info">
            <span>Name</span>
            </div>
        </div>
    </div>
  )
}

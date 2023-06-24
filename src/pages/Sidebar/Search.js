import React, { useState } from 'react'
import './Sidebar.css'
import Char1 from "../../img/addAvatar.png"
export default function Search() {

    const [name,setName] =useState('');

  return (
    <div className="search">
        <div className="search-form">
            <input type="text" placeholder='find user'/>
        </div>
        <div className="userinfo">
            <img src={Char1}  />
            <div className="info">
            <span>Name</span>
            </div>
        </div>
    </div>
  )
}

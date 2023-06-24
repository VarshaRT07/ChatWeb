import './Sidebar.css'

import React from 'react'
import { useLogout } from '../../hooks/useLogout';

import Search from './Search'
import Char1 from "../../img/addAvatar.png"
import Chats from './Chats'


export const Sidebar = () => {
  const {logout}=useLogout();

  return (
    <div className='sidebar'>
      <div className="navbar">
       <span>CharKaro</span>
       <div className='user'>
       <img src={Char1}  />
         <p>Name</p>
        <button onClick={logout}>Logout</button>
       </div>
       </div>
       <Search/>
       <Chats/>
    </div>
  )
}

import './Sidebar.css'

import React from 'react'
import { useLogout } from '../../hooks/useLogout';

import Search from './Search'

import Chats from './Chats'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


export const Sidebar = () => {
  const {logout}=useLogout();
  const {user}= useContext(AuthContext)

  return (
    <div className='sidebar'>
      <div className="navbar">
       <span>CharKaro</span>
       <div className='user'>
        <button onClick={logout}>Logout</button>
       </div>
       </div>
       <Search/>
       <Chats/>
    </div>
  )
}

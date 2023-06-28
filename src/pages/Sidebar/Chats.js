import React, { useState, useEffect, useContext } from 'react';
import './Sidebar.css';
import { useFirestore } from '../../hooks/useFirestore';
import { AuthContext } from '../../context/AuthContext';

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { user } = useContext(AuthContext);
  const { getDocumentById} = useFirestore('userchats');
  

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
       
        const document= await getDocumentById(user.uid);
        
        if(document){
           if (document.exists()) {
            setChats(document.data());
        }
        }
        else {
          setChats([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserChats();
  }, [user.uid]); 
  console.log(chats)

  return (
    <div>
      <div className="userinfo">
        <img src={user.photoURL} alt="" />
        <div className="info">
          <span>{user.displayName}</span>
        </div>
      </div>
    </div>
  );
}

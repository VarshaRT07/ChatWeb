import React, { useState } from 'react'
import './Sidebar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import { projectFirestore, timestamp } from '../../firebase/config'
export default function Search() {

    const [username,setUsername] =useState('');


    const { addDocument } = useFirestore('chats');
    const { getDocumentById } = useFirestore("chats");

    const {user}= useContext(AuthContext)

    
    const {documents:document,error}= useCollection(
      'users',
    ["displayName","==",username]
    )



    const handleSelect= async ()=>{
      const combinedId =
      user.uid > document[0].uid
        ? user.uid + document[0].uid
        : document[0].uid + user.uid;


        try{
          

        
          const res = await getDocumentById(combinedId);
          console.log(res)

          if (!res || !res.exists()) {
            // Create a chat in the chats collection
            await addDocument({ messages: [] });
      
            // Create user chats
            const userChatsRef = projectFirestore.collection('userchats');
        const userChatData = {
          [combinedId]: {
            userinfo: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            date: timestamp.now(),
          },
        };
        const docChatData = {
          [combinedId]: {
            userinfo: {
              uid: document[0].uid,
              displayName: document[0].displayName,
              photoURL: document[0].photoURL,
            },
            date: timestamp.now(),
          },
        };

      
            // await userChatsRef.doc(document[0].uid).update(userChatData);
            // await userChatsRef.doc(user.uid).update(docChatData);
            await userChatsRef.doc(user.uid).set({ [combinedId]: userChatData }, { merge: true });
            await userChatsRef.doc(document[0].uid).set({ [combinedId]: docChatData }, { merge: true });
      
          }
        } catch (err) {
          console.error(err);
        }
      
       
        setUsername("");
      };




  return (
    <div className="search">
        <div className="search-form">
            <input type="text" 
            placeholder='find user'
          onChange={(e)=> setUsername(e.target.value) }value={username}
            />
        </div>
      {error && <p>User not found</p>}
    
      {document.length > 0 && (
        <div className="userinfo" onClick={handleSelect}>
          <img src={document[0].photoURL} alt="" />
          <div className="info">
            <span>{document[0].displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}
 

import { projectAuth, projectFirestore, projectStorage } from '../firebase/config'
import { useState, useEffect } from 'react'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useFirestore } from './useFirestore';

export const useSignup =()=> {
    const [isCancelled,setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const {dispatch}= useContext(AuthContext)
    const [downloadURL, setDownloadURL] = useState('');
    
    const { addDocument: addUserDocument } = useFirestore('users');
    const { addDocument: addUserChatDocument } = useFirestore('userchats');
   
    const signup = async(email, password,displayName,profilePicture)=>{
        setError(null)
        setIsPending(true)

        try{
            const res=await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)
            

            if(!res){
                throw new Error('Could not complete signup')
            }

            if (profilePicture) {
                const storageRef = projectStorage.ref(`profilePictures/${profilePicture.name}`);
                const snapshot = await storageRef.put(profilePicture);
                const downloadURL = await snapshot.ref.getDownloadURL();
                setDownloadURL(downloadURL);
                
                await res.user.updateProfile({
                displayName,
                photoURL: downloadURL, 
              });
                await addUserDocument({
                displayName,
                email,
                photoURL: downloadURL,
                uid:res.user.uid
              });
                await addUserChatDocument({
                
                    
                })
                
              }
     
              
          
             
             
              console.log(res.user)
            

            dispatch({type: 'LOGIN', payload:res.user})

            if(!isCancelled){
                setError(error)
                setIsPending(false);
           }

        }
        catch(err){
            if(!isCancelled){

                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    
    useEffect(()=>{
        return ()=> setIsCancelled(true);
    },[])
    
     return {error, isPending, signup};
}

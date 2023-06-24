import { projectAuth } from '../firebase/config'
import { useState, useEffect } from 'react'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useLogin=() => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const {dispatch}= useContext(AuthContext)


    const login= async (email, password) => {
        setError(null);
        setIsPending(true);
        try{
            const req=await projectAuth.signInWithEmailAndPassword(email, password);
            console.log(req)
            dispatch({type:'LOGIN',payload:req.user})
        
            setError(error)
            setIsPending(false);
           
          

       }
       catch(err){
    
               console.log(err)
               setError(err.message)
               setIsPending(false);
           
       }
       
    }


   
    return {login,error,isPending}
}
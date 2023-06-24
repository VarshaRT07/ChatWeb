import { projectAuth } from '../firebase/config'
import { useState } from 'react'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export const useLogout =()=>{
    
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const {dispatch}= useContext(AuthContext)

    const logout = async ()=>{
        setError(null);
        setIsPending(true);

        try{
            await projectAuth.signOut();
            

            dispatch({type:'LOGOUT'})

            
            setError(error)
            setIsPending(false);
            
           

        }
        catch(err){
           

                console.log(err)
                setError(err.message)
                setIsPending(false);
            
        }   

    }


    return {logout,error,isPending}
}
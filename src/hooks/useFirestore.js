import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState={
    isPending: false,
    error: null,
    document: null,
    success: null
}

const firestoreReducer=(state,action)=>{
    switch(action.type){
        case "IS_PENDING":
            return {isPending: true, error: null,document: null,success: null};
        
        case "ADDED_DOCUMENT":
            return {isPending: false,document:action.payload,success:true, error:null}

        case "DELETED_DOCUMENT":
             return {isPending: false,document:action.payload,success:true, error:null}

        case "GOT_DOCUMENT":
             return { isPending: false, document: action.payload, success: true, error: null };              
    
        case "ERROR":
            return {isPending: false,error:action.payload,success:false,document:null}
        default:
        return state;
    }
    
}




export const useFirestore =(collection)=>{
    const[response,dispatch]= useReducer(firestoreReducer,initialState);
    const [isCancelled,setIsCancelled]= useState(false)

    const ref=projectFirestore.collection(collection)

    const dispatchIfnotReady =(action)=>{
      if(!isCancelled){
    dispatch(action)
    }
  }

    //add
    const addDocument=async (doc)=>{

        dispatch({type:'IS_PENDING'})
       

        try{
            const createdAt=timestamp.fromDate(new Date());
            const addDocument= await ref.add(doc,createdAt);
            console.log(addDocument);
            dispatchIfnotReady({type:'ADDED_DOCUMENT',payload:addDocument})
            
        }catch (err){
            dispatchIfnotReady({type:"ERROR",payload:err.message});

        }

    }

    //delete
    const deleteDocument=async (id)=>{
        dispatch({type:'IS_PENDING'})
        try{
            
            const deletedDocument= await ref.doc(id).delete();
          
            dispatchIfnotReady({type:'DELETED_DOCUMENT',payload:deletedDocument})
        }catch (err){
            dispatchIfnotReady({type:"ERROR",payload:err.message});

        }


    }

    // get document
  const getDocumentById = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    console.log(id)
    

    try {
      const documentSnapshot = await ref.doc(id).get();
    
        const documentData = documentSnapshot.data();
        console.log(documentData)
        dispatchIfnotReady({ type: 'GOT_DOCUMENT', payload: documentData });
      
    } catch (err) {
      dispatchIfnotReady({ type: 'ERROR', payload: err.message });
    }
  };

    useEffect(()=>{
        return ()=>{
            setIsCancelled(true);
        }

    },[])

    return {addDocument,deleteDocument,getDocumentById,response}



}

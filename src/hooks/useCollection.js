import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection=(collection,query) =>{
    const [documents,setDocuments]=useState([]);
    const [error,setError]=useState('');



    useEffect(()=>{
        let ref=projectFirestore.collection(collection);
   
       
        if (query && query.length === 3) {
            const [field, operator, value] = query;
            ref = ref.where(field, operator, value);
          }

      
       
        const unsub = ref.onSnapshot(
            (snapshot) => {
              let results = [];
              snapshot.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id });
              });
      
              setDocuments(results);
              setError(null);
            },
            (err) => {
              console.log(err);
              setError('Could not fetch data');
            }
          );

        return ()=>unsub();
    },[collection, query])

    return {documents,error}
}
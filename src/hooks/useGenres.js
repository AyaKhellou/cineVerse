import { useState, useEffect } from 'react'
import { getGenres } from '../services/tmbd'

export default function useGenres(){
    const [genres, setGenres] = useState([]);
    const [loading , setLoading] = useState(true);
    const [err , setErr] = useState(null)

    useEffect(()=>{
        getGenres()
        .then(setGenres)
        .catch(setErr)
        .finally(()=>setLoading(false))
    },[])
    
    return { genres, loading, err };
}
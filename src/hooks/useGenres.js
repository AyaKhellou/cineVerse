import { useState, useEffect } from 'react'
import { getGenres } from '../services/tmbd'

export default function useGenres(){
    const [genres, setGenres] = useState([]);

    useEffect(()=>{
        getGenres()
        .then(setGenres)
        .catch(console.error)
    },[])
    
    return genres;
}
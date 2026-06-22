import { useState, useEffect } from 'react'
import { getMovies } from '../services/tmbd'

export default function useMovies(){
    const [allMovies, setAllMovies] = useState([]);
    useEffect(()=>{
        getMovies()
        .then(setAllMovies)
        .catch(console.error)
    },[])

    return allMovies;
}
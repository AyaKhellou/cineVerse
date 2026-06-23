import { useState, useEffect } from 'react'
import { getMovies } from '../services/tmbd'

export default function useMovies(){
    const [allMovies, setAllMovies] = useState([]);
    const [loading , setLoading] = useState(true);
    const [err , setErr] = useState(null)

    useEffect(()=>{
        getMovies()
        .then(setAllMovies)
        .catch(setErr)
        .finally(()=> setLoading(false))
    },[])

    return { allMovies, loadingMovies: loading, errorLoadingMovies: err };
}
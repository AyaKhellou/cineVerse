import { getTrendingMovies } from '../services/tmbd'
import { useState, useEffect } from 'react'

export default function useTrendingMovies(){
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(()=>{
        setLoading(true)
        getTrendingMovies()
            .then(setTrendingMovies)
            .catch(setErr)
            .finally(()=> setLoading(false))
    },[])

    return { trendingMovies, loading, err };
}

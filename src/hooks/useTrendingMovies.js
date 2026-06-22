import { getTrendingMovies } from '../services/tmbd'
import { useState, useEffect } from 'react'

export default function useTrendingMovies(){
    const [trendingMovies, setTrendingMovies] = useState([]);
    useEffect(()=>{
        getTrendingMovies()
            .then(setTrendingMovies)
            .catch(console.error)
    },[])

    return trendingMovies;
}

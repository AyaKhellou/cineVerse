import { Outlet } from 'react-router-dom'
import Header from './Header'
import React from 'react'

export default function Layout(){
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [trendingMovies, setTrendingMovies] = React.useState([]);

    
    React.useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&include_adult=false`)
        .then(res=> res.json())
        .then(data=> setTrendingMovies(data.results))
        .catch(err => console.error(err))
    },[])

    const [genres, setGenres] = React.useState([]);
    
    React.useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
        .then(res=> res.json())
        .then(data=> setGenres(data.genres))
        .catch(err => console.error(err))
    },[])

    const [allMovies, setAllMovies] = React.useState([]);
    
    React.useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false`)
        .then(res=> res.json())
        .then(data=> setAllMovies(data.results))
        .catch(err => console.error(err))
    },[])


    return(
        <>
            <Header />
            <Outlet context={{ trendingMovies, genres, allMovies, API_KEY }} />
        </>
    )
}

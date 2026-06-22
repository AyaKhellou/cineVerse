import { NavLink, useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { useState, useEffect } from 'react'
import { getMoviesByGenres } from '../services/tmbd'
import useGenres from '../hooks/useGenres'
import useMovies from '../hooks/useMovies'

export default function Genres(){
    const genres = useGenres();
    const allMovies = useMovies();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [activeFilters, setActiveFilters] = useState(searchParams.get('id')?searchParams.get('id').split(',').filter(id=> id!=='').map(id=> Number(id)):[])


    function filterMovies(e){
        const id = Number(e.target.id);

        setActiveFilters(prev => prev.includes(id) ?
            prev.filter(item=> item !== id) :
            [...prev, id])
    }

    useEffect(()=>{
        setSearchParams({id: activeFilters.join(',')})
    }, [activeFilters])

    const filterId = searchParams.get('id');

        useEffect(()=>{
            getMoviesByGenres(filterId)
            .then(setFilteredMovies)
            .catch(console.error)
        },[filterId])

    function clearFilter(){
        setActiveFilters([])
        setSearchParams(prev =>{
            prev.delete('id')
            return prev;
    })
    }
    
    return(
        <div className="genres-page">
            <h1>my genres</h1>
            <div className="genres-container">
                {genres.map(genre => (
                    <button
                        key={genre.id}
                        type="button"
                        id={genre.id}
                        onClick={filterMovies}
                        className={activeFilters.includes(genre.id) ? 'genre-item active' : 'genre-item'}>
                        {genre.name}
                    </button>
                ))}
                <button type="button" className="genre-clear-button" onClick={clearFilter}>Clear filters</button>
            </div>
            <div className="movies-container">
                {filterId ? filteredMovies.map(movie => (
                    <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    genre={genres.find(genre => genre.id === movie.genre_ids[0])}
                    />
                )) : 
                    allMovies.map(movie => (
                        <MovieCard 
                        key={movie.id}
                        movie={movie} 
                        genre={genres.find(genre => genre.id === movie.genre_ids[0])}
                        />
                    ))
                }
            </div>
        </div>
    )}
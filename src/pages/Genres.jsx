import { NavLink, useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { useState, useEffect } from 'react'
import { getMoviesByGenres } from '../services/tmbd'
import useGenres from '../hooks/useGenres'
import useMovies from '../hooks/useMovies'

export default function Genres(){
    const { genres, loading: loadingGenres, err: errorGenres } = useGenres();
    const { allMovies, loadingMovies, errorLoadingMovies } = useMovies();
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
    
    // show loading if either genres or movies are still loading
    if (loadingGenres || loadingMovies) return (
        <div className="genres-page">
            <h1>Genres</h1>
            <Loading />
        </div>
    )

    // show error if either request failed
    if (errorGenres || errorLoadingMovies) return (
        <div className="genres-page">
            <h1>Genres</h1>
            <Error err={errorGenres || errorLoadingMovies} />
        </div>
    )

    return(
        <div className="genres-page page-container">
            <div className="genres-header page-header">
                <h1 className="page-title">Genres</h1>
                <p className="page-subtitle">Browse by genre — showing {filterId ? filteredMovies.length : allMovies.length} movies</p>
            </div>

            <div className="genres-container controls">
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
                {filterId ? (
                    filteredMovies.length === 0 ? (
                        <div className="genres-empty">No movies match these filters.</div>
                    ) : (
                        filteredMovies.map(movie => (
                            <MovieCard 
                                key={movie.id} 
                                movie={movie} 
                                genre={genres.find(genre => genre.id === movie.genre_ids[0])}
                            />
                        ))
                    )
                ) : (
                    allMovies.map(movie => (
                        <MovieCard 
                            key={movie.id}
                            movie={movie} 
                            genre={genres.find(genre => genre.id === movie.genre_ids[0])}
                        />
                    ))
                )}
            </div>
        </div>
    )}
import { useSearchParams } from "react-router-dom"
import React from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies } from '../services/tmbd'
import useGenres from "../hooks/useGenres";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function SearchPage(){
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const { genres } = useGenres();
    const [searchError, setSearchError] = React.useState(null);
    
    const query = searchParams.get('query');

    React.useEffect(()=>{
        if (!query) {
            setSearchResults(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        searchMovies(query)
            .then(setSearchResults)
            .catch((err) => {
                setSearchError(err)
                setSearchResults([])
            })
            .finally(() => setLoading(false))
    },[query])

    function findGenre(movie){
        const genre = movie.genre_ids ?
            genres.find(genre => genre.id === movie.genre_ids[0]) :
        movie.genres ?
            movie.genres[0] :
        null;
        return genre;
    }

    return(
        <main className="search-page">
            <header className="page-header">
                <h1>{query ? `Search results for “${query}”` : 'Search for a movie'}</h1>
                <p className="page-subtitle">Find movie posters, ratings, and details from TMDB.</p>
            </header>

                    {loading && <div className="empty-state"><Loading/></div>}

                    {searchError && (
                        <div className="empty-state"><Error err={searchError} /></div>
                    )}

            {!loading && query && searchResults?.length === 0 && (
                <div className="empty-state">
                    <h2>No results found for “{query}”</h2>
                    <p>Try a different title or spelling.</p>
                </div>
            )}

            {!loading && searchResults?.length > 0 && (
                <div className="movies-container">
                    {searchResults.map(movie => (
                        <MovieCard key={movie.id} movie={movie} genre={findGenre(movie)} />
                    ))}
                </div>
            )}
        </main>
    )
}
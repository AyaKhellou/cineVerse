import { useSearchParams, useOutletContext } from "react-router-dom"
import React from "react";
import MovieCard from "../components/MovieCard";

export default function SearchPage(){
    const [searchParams] = useSearchParams();
    const { API_KEY, genres } = useOutletContext();
    const [searchResults, setSearchResults] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    
    const query = searchParams.get('query');

    React.useEffect(()=>{
        if (!query) {
            setSearchResults(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`)
            .then(res=> res.json())
            .then(data=> setSearchResults(data.results))
            .catch(() => setSearchResults([]))
            .finally(() => setLoading(false))
    },[query, API_KEY])

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

            {loading && <div className="empty-state"><h2>Loading...</h2></div>}

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
import MovieCard from "../components/MovieCard"
import Loading from "../components/Loading"
import useFavorites from "../hooks/useFavorites"
import Error from "../components/Error";


export default function Favorites(){
    const { favMoviesList, err, loading } = useFavorites();

    if (loading) return (
        <div className="favorites-page">
            <h1>My Favorite Movies</h1>
            <Loading />
        </div>
    )

    if (err) return (
        <div className="favorites-page">
            <h1>My Favorite Movies</h1>
            <Error err={err}/>
        </div>
    )

    return(
        <div className="favorites-page">
            <h1>My Favorite Movies</h1>
            <p className="page-subtitle">You have {favMoviesList.length} favorite{favMoviesList.length === 1 ? '' : 's'} saved.</p>
            {favMoviesList.length === 0 ? (
                <p>No favorites yet. Add some movies to your favorites.</p>
            ) : (
                <div className="movies-container">
                    {favMoviesList.map(fav => (
                        <MovieCard 
                            key={fav.id} 
                            movie={fav} 
                            genre={fav.genres[0]}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
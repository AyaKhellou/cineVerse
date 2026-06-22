import MovieCard from "../components/MovieCard"
import useFavorites from "../hooks/useFavorites"


export default function Favorites(){
    const favMoviesList = useFavorites();

    return(
        <div className="favorites-page">
            <h1>My Favorite Movies</h1>
            <p className="page-subtitle">You have {favMoviesList.length} favorite{favMoviesList.length === 1 ? '' : 's'} saved.</p>
            <div className="movies-container">
                {favMoviesList.map(fav => (
                    <MovieCard 
                        key={fav.id} 
                        movie={fav} 
                        genre={fav.genres[0]}
                    />
                ))}
            </div>
        </div>
    )
}
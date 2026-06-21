import React from "react";
import { useParams, useOutletContext, Link, useLocation, useNavigate } from "react-router-dom";
import { Heart } from 'lucide-react';
import { updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";
import { db } from '../firebase-config'
import { useAuth } from '../authContext'


export default function MoviePage(){

    const { id } = useParams();
    const movieId = Number(id);
    const { allMovies, genres, API_KEY } = useOutletContext();
    const [movie, setMovie] = React.useState(null);
    const [loading , setLoading] = React.useState(false)
    const [err , setErr] = React.useState(null)
    const { user, userData, setUserData } = useAuth()
    const navigate = useNavigate();


    React.useEffect(() => {
        setLoading(true)

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setMovie(data);
            })
            .catch((err)=> setErr(err))
            .finally(()=> setLoading(false))
    },[id, API_KEY])

    const isFavorite = userData?.favorites?.some(favId => favId === movie?.id);

    async function toggleFavorite(){
        if(user){
        if(isFavorite){
            await updateDoc(doc(db, "users", user.uid),{
                    favorites: arrayRemove(movie.id)
                }
            );
            setUserData(prev => ({
        ...prev,
        favorites: prev.favorites.filter(id => id !== movie.id)
    }));
        }
        if(!isFavorite){
            await updateDoc(doc(db, "users", user.uid),{
                    favorites: arrayUnion(movie.id)
                }
            );
            setUserData(prev => ({
        ...prev,
        favorites: [...(prev.favorites || []), movie.id]
    }));
        }

        }
        if(!user){
            navigate('/signup')
        }
        
    }

    const location = useLocation();
    const from = location.state?.from || '/';
    const search = location.state?.search || '/';


    if(loading){
        return (
            <main className="movie-page">
                <div className="movie-not-found">
                    <h2>Loading...</h2>
                    <p>Please wait.</p>
                </div>
            </main>
        );
    }

    if (!movie) {
        return (
            <main className="movie-page">
                <div className="movie-not-found">
                    <h2>Movie not found</h2>
                    <p>Please go back to the home page and choose another title.</p>
                    <Link to={from} className="back-link">Back to Home</Link>
                </div>
            </main>
        );
    }

    if (err) {
        return (
            <main className="movie-page">
                <div className="movie-not-found">
                    <h2>{err.message}</h2>
                </div>
            </main>
        );
    }

    const genreNames = movie.genres
        .map((movieGenre) => genres.find((genre) => genre.id === movieGenre.id)?.name)
        .join(", ");

    return(
        <main className="movie-page">
            <img 
            className="movie-backdrop"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`} alt={movie.title}
            aria-hidden="true"
            />

            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-grid">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>

                <section className="movie-details">
                    <div className="movie-meta">
                        {movie.release_date && <span>{movie.release_date}</span>}
                        {movie.vote_average != null && <span>{movie.vote_average.toFixed(1)} ★</span>}
                        {movie.original_language && <span>{movie.original_language.toUpperCase()}</span>}
                        <button
                            className={`favorite-button${isFavorite ? ' active' : ''}`}
                            onClick={toggleFavorite}
                            aria-pressed={isFavorite}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                            <Heart className="favorite-icon" size={24} />
                        </button>
                    </div>

                    <p className="movie-overview">{movie.overview}</p>
                    <p className="movie-genres">Genres: {genreNames || "Unknown"}</p>
                    <Link to={from+search} className="back-link">Go Back</Link>
                </section>
            </div>
        </main>
    )
}
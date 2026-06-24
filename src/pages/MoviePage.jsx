import { useParams, useOutletContext, Link, useLocation, useNavigate } from "react-router-dom";
import { Heart } from 'lucide-react';
import { updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";
import { db } from '../firebase-config'
import { useAuth } from '../context/authContext'
import { addFavorite, removeFavorite } from '../services/firestore'
import useMovie from "../hooks/useMovie";
import useMovies from "../hooks/useMovies";
import useGenres from "../hooks/useGenres";
import { getPosterUrl } from '../services/tmbd'
import { useRef } from 'react'
import MovieCard from '../components/MovieCard'



export default function MoviePage(){

    const { id } = useParams();
    const movieId = Number(id);
    const { user, userData, setUserData } = useAuth()
    const navigate = useNavigate();
    const { movie, loading, err } = useMovie(movieId);
    const {allMovies} = useMovies();
    const { genres } = useGenres();
    const castRef = useRef(null);



    const isFavorite = userData?.favorites?.some(favId => favId === movie?.id);

    async function toggleFavorite(){
        if(user){
        if(isFavorite){
            removeFavorite(user.uid , movie.id)
            setUserData(prev => ({
        ...prev,
        favorites: prev.favorites.filter(id => id !== movie.id)
    }));
        }
        if(!isFavorite){
            addFavorite(user.uid , movie.id)
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
        <>
        <main className="movie-page">
            <img 
            className="movie-backdrop"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`} alt={movie.title}
            aria-hidden="true"
            />

            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-grid">
                <div className="movie-poster">
                    <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
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

            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
                <section className="cast-section">
                    <h2>Cast</h2>
                    <button
                        className="cast-nav left"
                        onClick={() => castRef.current?.scrollBy({ left: -240, behavior: 'smooth' })}
                        aria-label="Scroll cast left"
                    >
                        ‹
                    </button>

                    <div className="cast-list" ref={castRef}>
                        {movie.credits.cast.slice(0, 12).map((person) => (
                            <div className="cast-item" key={person.cast_id || person.credit_id}>
                                {person.profile_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt={person.name} />
                                ) : (
                                    <div className="cast-fallback">{person.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                                )}
                                <div className="cast-name">{person.name}</div>
                                <div className="cast-character">{person.character}</div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="cast-nav right"
                        onClick={() => castRef.current?.scrollBy({ left: 240, behavior: 'smooth' })}
                        aria-label="Scroll cast right"
                    >
                        ›
                    </button>
                </section>
            )}
        </main>
            {/* Similar movies */}
            {movie.similar?.results && movie.similar.results.length > 0 && (
                <section className="similar-section">
                    <h2>Similar movies</h2>
                    <div className="movies-container similar-movies">
                        {movie.similar.results.slice(0, 4).map(sim => (
                            <MovieCard key={sim.id} movie={sim} genre={genres.find(g => g.id === (sim.genre_ids ? sim.genre_ids[0] : sim.genres?.[0]?.id))} />
                        ))}
                    </div>
                </section>
            )}

            {movie.recommendations?.results && movie.recommendations.results.length > 0 && (
                <section className="similar-section">
                    <h2>Recomended movies</h2>
                    <div className="movies-container similar-movies">
                        {movie.recommendations.results.slice(0, 6).map(rec => (
                            <MovieCard key={rec.id} movie={rec} genre={genres.find(g => g.id === (rec.genre_ids ? rec.genre_ids[0] : rec.genres?.[0]?.id))} />
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import useTrendingMovies from '../hooks/useTrendingMovies'
import useGenres from "../hooks/useGenres";

export default function Home(){
    const trendingMovies = useTrendingMovies();
    const genres = useGenres();

    return(
        <>
            <section className="trending">
                <div className="trending-copy">
                    <span>trending</span>
                    {!trendingMovies || trendingMovies.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <h2>{trendingMovies[0].title}</h2>
                            <p>{trendingMovies[0].overview}</p>
                            <Link to={`/movie/${trendingMovies[0].id}`} className="trending-cta">
                                More Info
                            </Link>
                        </>
                    )}
                </div>
                <div className="trending-image">
                    {trendingMovies && trendingMovies[0] && (
                        <img src={`https://image.tmdb.org/t/p/w780${trendingMovies[0].backdrop_path}`} alt={trendingMovies[0].title} />
                    )}
                </div>
            </section>
            <section className="trending-list">
                <h3>Trending movies</h3>
                <div className="movies-container">
                {trendingMovies.slice(0,6).map((movie) => (
                    <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    genre={genres.find(genre => genre.id === movie.genre_ids[0])}
                    />
                ))}
                </div>
            </section>
        </>
    )
}
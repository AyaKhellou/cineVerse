import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import useTrendingMovies from '../hooks/useTrendingMovies'
import useGenres from "../hooks/useGenres";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Home(){
    const { trendingMovies, loading, err } = useTrendingMovies();
    const {genres} = useGenres();
    return(
        <>
            <section className="trending">
                <div className="trending-copy">
                    <span>trending</span>
                    {loading ? (
                        <Loading />
                    ) : err ? (
                        <Error err={err} />
                    ) : trendingMovies && trendingMovies.length > 0 ? (
                        <>
                            <h2>{trendingMovies[0].title}</h2>
                            <p>{trendingMovies[0].overview}</p>
                            <Link to={`/movie/${trendingMovies[0].id}`} className="trending-cta">
                                More Info
                            </Link>
                        </>
                    ) : (
                        <div className="empty-state"><h3 className="section-title">No trending movies available</h3></div>
                    )}
                </div>
                <div className="trending-image">
                    {trendingMovies && trendingMovies[0] && (
                        <img src={`https://image.tmdb.org/t/p/w780${trendingMovies[0].backdrop_path}`} alt={trendingMovies[0].title} />
                    )}
                </div>
            </section>
            <section className="trending-list">
                <h3 className="section-title">Trending movies</h3>
                <div className="movies-container">
                {(trendingMovies || []).slice(0,trendingMovies.length).map((movie) => (
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
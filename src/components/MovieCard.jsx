import React from "react"
import { Link,useLocation } from "react-router-dom"

export default function MovieCard({ movie,genre }) {
    const location = useLocation();


    return (
        <Link to={`/movie/${movie.id}`} state={{ from: location.pathname, search: location.search }}>
        <div className="movie-item">
            
                <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} />
                <div className="movie-info">
                    <span>{genre ? genre.name : null}</span>
                    <h3>{movie.title}</h3>
                </div>
        </div>
            </Link>

    )
}
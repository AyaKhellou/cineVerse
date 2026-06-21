import { useOutletContext } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { useAuth } from '../authContext'
import { useState, useEffect } from "react"



export default function Favorites(){
    const { API_KEY } = useOutletContext()
    const { userData } = useAuth()
    const [favMoviesList, setFavMoviesList] = useState([])


    useEffect(() => {
    if (!userData?.favorites?.length) return;

    Promise.all(
        userData.favorites.map(id =>
            fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            ).then(res => res.json())
        )
    )
    .then(movies => {
        setFavMoviesList(movies);
    })
    .catch(err => console.log(err));
}, [userData?.favorites, API_KEY]);


    return(
        <div className="favorites-page">
            <h1>My Favorite Movies</h1>
            <p className="page-subtitle">You have {userData?.favorites?.length} favorite{userData?.favorites?.length === 1 ? '' : 's'} saved.</p>
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
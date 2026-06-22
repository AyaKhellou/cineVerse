import { useState, useEffect } from "react";
import { useAuth } from '../context/authContext'
import { getMovie } from '../services/tmbd'

export default function useFavorites(){
    const { userData } = useAuth()
    const [favMoviesList, setFavMoviesList] = useState([])
    const API_KEY = import.meta.env.VITE_API_KEY;


    useEffect(() => {
        if (!userData?.favorites?.length) return;

        Promise.all(
            userData.favorites.map(id => getMovie(id))
        )
        .then(movies => {
            setFavMoviesList(movies);
        })
        .catch(console.error);
    }, [userData?.favorites, API_KEY]);

    return favMoviesList;
}
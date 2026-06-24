import { getMovie } from '../services/tmbd'
import { useState, useEffect } from 'react'


export default function useMovie(id){

    const [movie, setMovie] = useState(null);
    const [loading , setLoading] = useState(false);
    const [err , setErr] = useState(null)    

    useEffect(() => {
        setLoading(true)

        getMovie(id)
            .then(setMovie)
            .catch((err)=> setErr(err))
            .finally(()=> setLoading(false))
    },[id])

    return { movie, loading, err };
}

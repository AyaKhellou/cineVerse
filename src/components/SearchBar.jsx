import { Search } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar(){
    const navigate = useNavigate();

    function searchMovie(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchValue = formData.get('search')
        
        navigate(`search?query=${searchValue}`)
    }

    return(
        <form className="searchBar" onSubmit={searchMovie}>
            <input type="text" name='search' />
            <button type="submit">
                <Search/>
            </button>
        </form>
    )
}
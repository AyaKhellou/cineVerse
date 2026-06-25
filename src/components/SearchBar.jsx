import { Search } from 'lucide-react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar(){
    const navigate = useNavigate();
    const [search, setSearch] = useState(null);
    console.log(search);
    

    function searchMovie(e){
        e.preventDefault();
        navigate(`search?query=${search}`)
        setSearch('')
    }

    return(
        <form className="searchBar" onSubmit={searchMovie}>
            <input type="text" name='search' value={search} onChange={(e)=> setSearch(e.target.value)} />
            <button type="submit">
                <Search/>
            </button>
        </form>
    )
}
import { NavLink } from 'react-router-dom'
import { User } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import { useAuth } from "../authContext";


export default function Header(){

    const { user } = useAuth();
    return(
        <header>
            <SearchBar />
            <nav>
                <NavLink to="/"
                    className={({ isActive }) => isActive ? "active-link" : "" }
                >Home</NavLink>
                <NavLink to="/genres"
                    className={({ isActive }) => isActive ? "active-link" : "" }
                >Genres</NavLink>
                {user ?
                <>
                    <NavLink to="/favorites"
                    className={({ isActive }) => isActive ? "active-link" : "" }
                    >Favorite</NavLink>
                    <NavLink to="/profile"
                        className={({ isActive }) => isActive ? "active-link profile-link" : "profile-link" }
                    >
                        <User size={16} />
                        Profile
                    </NavLink>
                </>:
                <>
                    <NavLink to="/login"
                    className={({ isActive }) => isActive ? "active-link" : "" }
                    >Log in</NavLink>
                    <NavLink to="/signup"
                    className={({ isActive }) => isActive ? "active-link" : "" }
                    >Sign up</NavLink>
                </>
                }
                
            </nav>
        </header>
    )
}
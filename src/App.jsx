import { BrowserRouter } from 'react-router-dom'
import { Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Genres from './pages/Genres'
import Favorites from './pages/Favorites'
import MoviePage from './pages/MoviePage'
import SearchPage from './pages/SearchPage'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Authrequired from './pages/Authrequired'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='genres' element={<Genres/>}/>
          <Route path='search' element={<SearchPage/>}></Route>
          <Route path='movie/:id' element={<MoviePage/>}/>
          
          <Route element={<Authrequired/>}>
            <Route path='profile' element={<Profile/>}/>
            <Route path='favorites' element={<Favorites/>}/>
          </Route>

          <Route path='login' element={<LogIn/>}/>
          <Route path='signup' element={<SignUp/>}/>

          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
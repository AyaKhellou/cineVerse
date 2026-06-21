import { BrowserRouter } from 'react-router-dom'
import { Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './layout/Home'
import Genres from './layout/Genres'
import Favorites from './layout/Favorites'
import MoviePage from './layout/MoviePage'
import SearchPage from './layout/SearchPage'
import NotFound from './layout/NotFound'
import Profile from './layout/Profile'
import SignUp from './layout/SignUp'
import LogIn from './layout/LogIn'
import Authrequired from './layout/Authrequired'



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
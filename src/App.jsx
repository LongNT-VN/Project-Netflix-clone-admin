import './App.scss';
import Home from './pages/home/Home';
import TopBar from './components/TopBar/TopBar'
import SideBar from './components/SideBar/SideBar'
import Login from './pages/login/Login';
import MovieList from './pages/movieList/MovieList';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';
import Movie from './pages/movie/Movie';
import NewMovie from './pages/newMovie/NewMovie';
import ListList from './pages/listList/ListList';
import List from './pages/list/List';
import NewList from './pages/newList/NewList';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      </Routes>
      {user ? (
        <>
          <TopBar />
          <div className="container">
            <SideBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/new" element={<NewMovie />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/lists" element={<ListList />} />
              <Route path="/list/new" element={<NewList />} />
              <Route path="/list/:id" element={<List />} />
            </Routes>
          </div>
        </>
      ) : <Navigate to="/login" replace />
      }
    </BrowserRouter>
  );
}

export default App;

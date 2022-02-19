import './MovieList.scss'
import { Delete } from '@material-ui/icons'
import { useContext, useEffect } from 'react'
import { MovieContext } from '../../context/movieContext/MovieContext'
import { deleteMovie, getMovies } from '../../context/movieContext/apiCall'
import { Link, useNavigate } from "react-router-dom";
const MovieList = () => {
    const { movies, dispatch } = useContext(MovieContext);
    let navigate = useNavigate();
    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);
    const handleDelete = (id) => {
        deleteMovie(id, dispatch);
    }
    const handleGet = (movieinfo, id) => {
        navigate("/movie/" + id, { state: { movie: movieinfo } })
    }
    return (
        <div className="movieList">
            <Link to="/movie/new" className="link">
                <div className="Create">New movie</div>
            </Link>
            <table className="movieListTable">
                <tr className="movieListTr">
                    <th className="movieListTH">ID</th>
                    <th className="movieListTH movieColumn">Movie</th>
                    <th className="movieListTH">Genre</th>
                    <th className="movieListTH">Year</th>
                    <th className="movieListTH">Limit</th>
                    <th className="movieListTH">Series</th>
                    <th className="movieListTH">Action</th>
                </tr>
                {movies.map((movie, index) => {
                    return <>
                        <tr className="movieListTr rowdata">
                            <td className="movieListTd">
                                <span>{index + 1}</span>
                            </td>
                            <td className="movieListTd movieName">
                                <img
                                    src={
                                        movie.imageSmall || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                                    }
                                    alt=""
                                    className="widgetSmImg"
                                />
                                <span className="movieName">{movie.title}</span>
                            </td>
                            <td className="movieListTd">
                                <span>{movie.genre}</span>
                            </td>
                            <td className="movieListTd">
                                <span>{movie.year}</span>
                            </td>
                            <td className="movieListTd">
                                <span>{movie.limit}</span>
                            </td>
                            <td className="movieListTd">
                                <span >{movie.isSeries ? "Yes" : "No"}</span>
                            </td>
                            <td className="movieListTd">
                                <span className="editButton" onClick={() => handleGet(movie, movie._id)}>Edit</span>
                                <div className="remove" onClick={() => handleDelete(movie._id)}>
                                    <Delete className="icon" />
                                </div>
                            </td>
                        </tr>
                    </>
                })}
            </table>
        </div >

    )
}

export default MovieList

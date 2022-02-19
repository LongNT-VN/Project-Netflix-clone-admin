import './List.scss';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react'
import { MovieContext } from '../../context/movieContext/MovieContext'
import { getMovies } from '../../context/movieContext/apiCall'
import {updateList} from '../../context/listContext/apiCall'
import { ListContext } from '../../context/listContext/ListContext';

const List = () => {
    let navigate = useNavigate();
    const [listinfo, setListinfo] = useState({"type": "movie"});
    const { dispatch } = useContext(ListContext);
    const location = useLocation();
    const list = location.state.list;
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
    useEffect(() => {
        getMovies(dispatchMovie);
    }, [dispatchMovie]);
    const movietitles = [];
    movies.forEach(movie => {
        if(list.content.includes(movie._id))
        {
            movietitles.push(movie.title);
        }
    })
    movies.sort();
    const handleChange = (e) => {
        const value = e.target.value;
        setListinfo({ ...listinfo, [e.target.name]: value });
    }
    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setListinfo({ ...listinfo, [e.target.name]: value });
    }
    console.log(listinfo)
    const handleSubmit = (e) => {
        e.preventDefault();
        updateList(list._id,listinfo, dispatch);
        navigate("/lists",{ replace: true });
    }   
    return (
        <div className="list">
            <div className="listTop">
                <h2>List</h2>
                <Link to="/list/new" className="link">
                    <div className="Create">New list</div>
                </Link>
            </div>
            <div className="listInfo">
                <div className="listName">
                    <span>{list.title}</span>
                </div>
                <span><b>Id: </b> {list._id}</span>
                <span><b>Genre: </b> {list.genre}</span>
                <span><b>Type: </b> {list.type}</span>
                <span><b>List movie: </b></span>
                {movietitles.map(movie => (
                    <span>{movie}</span>
                ))}
            </div>
            <div className="listUpdateForm">
                <form action="" className="updateForm">
                    <label>List Title</label>
                    <input type="text" placeholder={list.title} name="title" onChange={handleChange}/>
                    <label>List genre</label>
                    <input type="text" placeholder={list.genre} name="genre" onChange={handleChange}/>
                    <label>List Movie</label>
                    <select multiple className="content" name="content" onChange={handleSelect}>
                        {movies.map(movie=>(
                             <option value={movie._id}>{movie.title}</option>
                        ))}
                    </select>
                    <label>Type</label>
                    <select className="type" name="type" onChange={handleChange}>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                    </select>
                    <button type="submit" className="updateButton" onClick={handleSubmit}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default List

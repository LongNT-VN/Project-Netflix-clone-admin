import { useContext, useEffect, useState } from 'react'
import './NewList.scss'
import { createList } from '../../context/listContext/apiCall';
import { ListContext } from '../../context/listContext/ListContext';
import { MovieContext } from '../../context/movieContext/MovieContext'
import { getMovies } from '../../context/movieContext/apiCall'
import { useNavigate } from 'react-router-dom';

const NewList = () => {
    let navigate = useNavigate();
    const [list, setList] = useState({"type": "movie"});
    const { dispatch } = useContext(ListContext);
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatchMovie);
    }, [dispatchMovie]);
    const movietitles = [];
    movies.forEach(movie => {
        movietitles.push(movie.title);
    })
    movietitles.sort();
    const handleChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });
    }
    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setList({ ...list, [e.target.name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        createList(list, dispatch);
        navigate("/lists",{ replace: true });
    }
    return (
        <div className="newlist">
            <h2>List</h2>
            <form action="" className="createForm">
                <label>List Title</label>
                <input type="text" placeholder="Dr. Stange 2" name="title" onChange={handleChange} />
                <label>List Description</label>
                <input type="text" placeholder="Description" name="desc" onChange={handleChange} />
                <label>List Genre</label>
                <input type="text" placeholder="Action..." name="genre" onChange={handleChange} />
                <label>List Movie</label>
                <select multiple className="content" name="content" onChange={handleSelect}>
                    {movies.map(movie => (
                        <option value={movie._id}>{movie.title}</option>
                    ))}
                </select>
                <label>Type</label>
                <select className="type" name="type" onChange={handleChange}>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>
                <button type="submit" className="createButton" onClick={handleSubmit}>Create list</button>

            </form>
        </div>
    )
}

export default NewList 

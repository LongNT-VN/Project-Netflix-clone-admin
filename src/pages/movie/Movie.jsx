import './Movie.scss'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import {storage} from '../../firebase';
import {ref, uploadBytesResumable,getDownloadURL  } from "firebase/storage";
import { updateMovie } from '../../context/movieContext/apiCall';
import { MovieContext } from '../../context/movieContext/MovieContext';

const Movie = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const movieinfo = location.state.movie;

    const [movie, setMovie] = useState({"isSeries": true});
    const [image, setImage] = useState({"image": movieinfo.image});
    const [imageTitle, setImageTitle] = useState({});
    const [imageSmall, setImageSmall] = useState({});
    const [trailer, setTrailer] = useState({});
    const [video, setVideo] = useState({});
    const [uploaded, setUploaded] = useState(0);
    const {dispatch} = useContext(MovieContext);


    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    }
    
    const upload = (items) => {
        items.forEach(item => {
            const fileName = new Date().getTime() + '_' + item.label + '_' + item.file.name;
            const storageRef = ref(storage, `/items/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            uploadTask.on("state_changes", snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Uploaded " + progress + " %");
            }, (err) => { console.log(err) }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setMovie((prev) => {
                        return { ...prev, [item.label]: downloadURL }
                    })
                    setUploaded((prev) => prev + 1);
                })
            }
            )
        })
    }

    
    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: image, label: "image" },
            { file: imageTitle, label: "imageTitle" },
            { file: imageSmall, label: "imageSmall" },
            { file: trailer, label: "trailer" },
            { file: video, label: "video" }

        ])
    }
    console.log(movie);
    const handleSubmit = (e) => {
        e.preventDefault();
        updateMovie(movieinfo._id,movie,dispatch);
        navigate("/movies", { replace: true });
        
    }
    return (
        <div className="movie">
            <div className="movieTop">
                <h2>Movie</h2>
                <Link to="/movie/new" className="link">
                    <div className="Create">New movie</div>
                </Link>
            </div>
            <div className="movieInfo">
                <div className="movieName">
                    <img
                        src={
                            movieinfo.image || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                        }
                        alt=""
                        className="widgetSmImg"
                    />
                    <span>{movieinfo.title}</span>
                </div>
                <span><b>id: </b> {movieinfo._id}</span>
                <span><b>genre: </b> {movieinfo.genre}</span>
                <span><b>limit: </b> {movieinfo.limit}</span>
                <span><b>year: </b> {movieinfo.year}</span>
            </div>
            <div className="movieUpdateForm">
                <form action="" className="updateForm">
                    <label>Movie Title</label>
                    <input type="text" placeholder={movieinfo.title} name="title" onChange={handleChange} />
                    <label>Movie Description</label>
                    <input type="text" placeholder={movieinfo.desc} name="desc" onChange={handleChange} />
                    <label>Movie Image</label>
                    <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
                    <label>Movie Image Tilte</label>
                    <input type="file" name="imageTitle" onChange={(e) => setImageTitle(e.target.files[0])} />
                    <label>Movie Image Small</label>
                    <input type="file" name="imageSmall" onChange={(e) => setImageSmall(e.target.files[0])} />
                    <label>Movie Trailer</label>
                    <input type="file" name="trailer" onChange={(e) => setTrailer(e.target.files[0])} />
                    <label>Movie Video</label>
                    <input type="file" name="video" onChange={(e) => setVideo(e.target.files[0])} />
                    <label>Movie Year</label>
                    <input type="text" placeholder={movieinfo.year} name="year" onChange={handleChange} />
                    <label>Movie Limit</label>
                    <input type="text" placeholder={movieinfo.limit} name="limit" onChange={handleChange} />
                    <label>Movie Genre</label>
                    <input type="text" placeholder={movieinfo.genre} name="genre" onChange={handleChange} />
                    <label>isSeries</label>
                    <select className="isSeries" name="isSeries" onChange={handleChange}>
                        <option value="true" selected>Yes</option>
                        <option value="false">No</option>
                    </select>
                    {(uploaded === 5) ? <button type="submit" className="updateButton" onClick={handleSubmit}>Update Movie</button>
                        : <button type="submit" className="updateButton" onClick={handleUpload}>Upload file</button>}
                </form>
                <div className="bigImage">
                    <img
                        src={
                            image.image
                        }
                        alt=""
                        className="widgetSmImg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Movie

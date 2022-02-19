import { useContext, useState } from 'react'
import './NewMovie.scss'
import {storage} from '../../firebase';
import {ref, uploadBytesResumable,getDownloadURL  } from "firebase/storage";
import { createMovie } from '../../context/movieContext/apiCall';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useNavigate } from 'react-router-dom';

const NewMovie = () => {
    let navigate = useNavigate();
    const [movie, setMovie] = useState({"isSeries": true});
    const [image, setImage] = useState({});
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

    const handleSubmit = (e) => {
        e.preventDefault();
        createMovie(movie,dispatch);
        navigate("/movies");
    }

    return (
        <div className="newMovie">
            <h2>Create Movie</h2>
            <form action="" className="updateForm">
                <label>Movie Title</label>
                <input type="text" placeholder="Dr. Stange 2" name="title" onChange={handleChange} />
                <label>Movie Description</label>
                <input type="text" placeholder="Description" name="desc" onChange={handleChange} />
                <label>Movie Image</label>
                <input type="file"  name="image" onChange={(e) => setImage(e.target.files[0])} />
                <label>Movie Image Tilte</label>
                <input type="file" name="imageTitle" onChange={(e) => setImageTitle(e.target.files[0])} />
                <label>Movie Image Small</label>
                <input type="file" name="imageSmall" onChange={(e) => setImageSmall(e.target.files[0])} />
                <label>Movie Trailer</label>
                <input type="file" name="trailer" onChange={(e) => setTrailer(e.target.files[0])} />
                <label>Movie Video</label>
                <input type="file"  name="video" onChange={(e) => setVideo(e.target.files[0])} />
                <label>Movie Year</label>
                <input type="text" placeholder="2021" name="year" onChange={handleChange} />
                <label>Movie Limit</label>
                <input type="text" placeholder="16+" name="limit" onChange={handleChange} />
                <label>Movie Genre</label>
                <input type="text" placeholder="Action..." name="genre" onChange={handleChange} />
                <label>isSeries</label>
                <select className="isSeries" name="isSeries" onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                {(uploaded===5) ? <button type="submit" className="createButton" onClick={handleSubmit}>Create Movie</button> 
                : <button type="submit" className="createButton" onClick={handleUpload}>Upload file</button>
                }
                
            </form>
        </div>
    )
}

export default NewMovie 

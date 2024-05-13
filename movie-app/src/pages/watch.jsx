import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { useParams } from 'react-router';
import YouTube from 'react-youtube'
import '../css/watch.css'
import CommentCard from "../components/commentCard";
import CommentsList from "../components/commentsList";
import Auth from "../components/auth";
import Navbar from "../components/navbar";

function Watch() {
    const { id, name } = useParams();
    const [source, setSource] = useState('');
    const [sourceURL, setSourceURL] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [comment, setComment] = useState("");
    var isAdmin = false;

    if (localStorage.getItem("is_admin") === "1") { isAdmin = true }
    useEffect(() => {
        axios.post(`/watch/${id}`, { id })
            .then(res => {
                setSource(res.data)
            })
            .catch(error => console.log(error))

        axios.get(`/watch/${id}/comments`)
            .then(res => {
                setCommentsList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleUpdateMovie = () => {
        axios.post(`/watch/${id}/update`, { id, name, sourceURL })
            .then(res => {
                alert(res.data);
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    const handleSendComment= () => {
        const values = {
            user_id: localStorage.getItem("user_id"),
            movie_id: id,
            content: comment,
        }
        axios.post(`/watch/${id}/comments`, values)
            .then(res => {
                setCommentsList([...commentsList, ...res.data])               
            })
            .catch(err => console.log(err))
        setComment("");
    }

    const handleFavourite= () => {
        const values = {
            user_id: localStorage.getItem("user_id"),
            movie_id: id,
        }
        axios.post(`/watch/${id}/favourite`, values)
            .then(res => alert(res.data))
            .catch(err => console.log(err))
    }
    return (
        <div className="movie-watch">
            <Auth />
            <Navbar/>
            <iframe className="video"
                title='Youtube player'
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
                src={`${source}`}>
            </iframe>
            <button className="btn btn-danger mx-3" onClick={handleFavourite}>Add to favourite</button>
            <p className="favourite-alert text-white">You can only add completed movie to favourite list</p>
            <div className="comment">
                <hr className="mt-0"/>
                <div className="comment-title text-white fw-semibold p-1">Comment</div>
                <div className="comment-area d-flex align-items-center mx-2 flex-column">
                    <CommentsList list={commentsList} id = {id}/>
                    <div className="comment-input my-2">
                        <div className="input-area">
                            <textarea placeholder="Comment here" maxLength="380" rows="4"
                            value={comment} 
                            onChange={(event) => setComment(event.target.value)}></textarea>
                            <input className="send-btn bg-danger text-white border-0" type="submit" name="send" value="Send" 
                            onClick={handleSendComment}/>
                        </div>
                    </div>
                </div>
            </div>
            {isAdmin && <form className="text-white p-2">
                <h5>Add source video for movie</h5>
                <div class="mb-2 d-flex">
                    <label class="form-label">Movie Id</label>
                    <input type="text" class="form-control" value={id} />
                </div>
                <div class="mb-2 d-flex">
                    <label class="form-label">Movie Source URL</label>
                    <input type="text" class="form-control" placeholder="Fill the URL here"
                        onChange={(event) => setSourceURL(event.target.value)} />
                </div>
                <button type="button" class="btn btn-danger" onClick={handleUpdateMovie}>Save</button>
            </form>
            }
        </div>
    )
}

export default Watch;
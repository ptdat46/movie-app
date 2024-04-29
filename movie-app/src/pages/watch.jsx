import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { useParams } from 'react-router';
import YouTube from 'react-youtube'
import '../css/watch.css'

function Watch() {
    const { id } = useParams();
    const [trailerId, setTrailerId] = useState('');
    useEffect(() => {
        axios.post(`/watch/${id}`, { id })
            .then(res => setTrailerId(res.data.results[0].key))
            .catch(error => console.log(error))
    }, [])
    return (
        <div className="movie-watch">
            <iframe className='video'
                title='Youtube player'
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
                src={`https://youtube.com/embed/${trailerId}?autoplay=0`}>
            </iframe>
            <div className="comment">
                <hr/>
                <div className="comment-title text-white fw-semibold p-2">Comment</div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Watch;
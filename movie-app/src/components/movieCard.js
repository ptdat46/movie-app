import '../css/movieCard.css'

const MovieCard = (props) => {
    const { movie } = props;
    return (
        <div className='movie'>
            <a href={`/movie/${movie.id}`} style={{textDecoration: "none"}}>
                <img className="movie-poster w-100 h-100" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='movie'></img>
                <h5 className='movie-name mt-2'>{movie.original_title}</h5>
            </a>
        </div>
    )
}

export default MovieCard;
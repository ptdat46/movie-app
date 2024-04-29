import MovieCard from "./movieCard";
import '../css/moviesList.css'
const MoviesList = (props) => {
    const {list} = props;
    return (
        <div className="movies-list">
                <div className="cards-list">
                {list.map((movie, index) => (
                    <MovieCard movie= {movie}/>
                ))}
                </div>
        </div>
    )
}

export default MoviesList;
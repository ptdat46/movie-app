import MovieCard from "./movieCard";
import '../css/moviesList.css'
const MoviesList = (props) => {
    const {title, list} = props;
    return (
        <div className="movies-list">
                <h3 className="text-danger p-3">{title}</h3>
                <div className="cards-list">
                {list.map((movie, index) => (
                    <MovieCard movie= {movie}/>
                ))}
                </div>
        </div>
    )
}

export default MoviesList;
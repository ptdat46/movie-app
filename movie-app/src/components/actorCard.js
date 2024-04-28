import '../css/actorCard.css'

const ActorCard = (props) => {
    const { actor } = props;
    return (
        <div className='actor-card'>
                <img className="actor-profile" src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}></img>
                <div>{actor.name}</div>
        </div>
    )
}

export default ActorCard;
import '../css/commentCard.css'

const CommentCard = (props) => {
    const { email, content, created } = props;
    return (
        <div className="comment-card">
            <p className="email-content">{email}: {content}</p>
            <p className="comment-created">{created}</p>
            <hr className='m-1'/>
        </div>
    )
}

export default CommentCard;
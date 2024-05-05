

const CommentCard = (props) => {
    const { user, content } = props;
    return (
        <div className="comment-card">
            <span>{user}: </span>
            <span>{content}</span>
        </div>
    )
}

export default CommentCard;
import CommentCard from './commentCard';

const CommentsList = (props) => {
    const { list } = props;
    return (
        <div>
            {list && list.map((comment, index) => (
                    <CommentCard email = {comment.email} content = {comment.content} created = {comment.created} key = {index}/>
                ))}
        </div>
    )
}

export default CommentsList;
import CommentCard from './commentCard';

const CommentsList = (props) => {
    const { id, list } = props;
    return (
        <div className='w-100'>
            {list && list.map((comment, index) => (
                    <CommentCard id = {id} email = {comment.email} content = {comment.content} created = {comment.created} commentId = {comment.id} key = {index}/>
                ))}
        </div>
    )
}

export default CommentsList;
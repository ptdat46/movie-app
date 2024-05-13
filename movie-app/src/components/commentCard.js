import '../css/commentCard.css'
import axios from '../api/posts'
import { Outlet } from "react-router-dom";

const CommentCard = (props) => {
    const { id, email, content, created, commentId } = props;
    let canDelete = false;
    if(localStorage.getItem("user") == email || localStorage.getItem("is_admin") == "1") canDelete = true;

    const handleDelete = () => {
        alert("Do you want to delete this comment?");
        axios.post(`/watch/${id}/delete-comment`, {commentId})
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err))
        
    }

    return (
        <div className="comment-card">
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <p className="email-content">{email}: {content}</p>
                    <p className="comment-created">{created}</p>
                </div>
                {canDelete && <button type="submit" class="btn-close btn-close-white shadow-none"
                    onClick={handleDelete}
                ></button>}
            </div>
            
           
            <hr className='m-1'/>
        </div>
    )
}

export default CommentCard;
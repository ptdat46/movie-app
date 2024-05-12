import axios from '../api/posts'

const UserCard = (props) => {
    const user = props.user;
    const buttonStyle = {
        backgroundColor: "#dc3545",
        border: "none",
        padding: "0.3rem 0.6rem",
        borderRadius: "0.2rem"
    }

    const handleDelete = () => {
        axios.post("/admin", user)
            .then(res => {
                alert(res.data);
                window.location.reload();
            })
            .catch(err => console.log(err))
    }
    return (
        <tr>
            <th scope="row">{user.id}</th>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td><button type = "submit" style={buttonStyle} onClick={handleDelete}>Delete</button></td>
        </tr>
    )
}

export default UserCard;
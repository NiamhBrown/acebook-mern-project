import "../../../css/post.css"
import { useState } from "react";
// import { useNavigate } from 'react-router-dom'; NOT BEING USED CURRENTLY
import { formatDistanceToNow } from 'date-fns';
import { likeComment, unlikeComment } from "../../services/comments"; //createComment needs to be added



const Comment = (props) => {
    console.log("this is the commentprops:", props)
  // const navigate = useNavigate(); NOT BEING USED CURRENTLY
    const token = props.token;
    // const postId = props.post._id;
    const commentId = props.comment._id;
    const commentTimestamp = props.comment.createdAt;
    console.log("This is the message",props.comment.message);
    const userId = localStorage.getItem("userId");
    const initialLikeCount = props.comment.likes.length;
    const initialLikeStatus = props.comment.likes.includes(userId)

    const [likeStatus, setLikeStatus] = useState(initialLikeStatus)
    const [likeCount, setLikeCount] = useState(initialLikeCount)

    function formatTimestamp(timestamp) {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    }

    const formattedTimestamp = formatTimestamp(commentTimestamp);

    const handleLike = async () => {

        if (likeStatus == false) {
        setLikeCount(likeCount + 1);

        try {
            await likeComment(token, commentId);
    }   catch (err) {
            console.error(err);
            setLikeCount(likeCount);
    }
    }   else if (likeStatus == true) {
        setLikeCount(likeCount - 1);
        try {
            await unlikeComment(token, commentId);
    }   catch (err) {
            console.error(err);
            setLikeCount(likeCount);

    }}

    setLikeStatus(!likeStatus)}
    return <div key={props.comment._id} className="comment">
        <h2>{props.comment.username} - {formattedTimestamp}</h2> 
        <article>{props.comment.message}</article>
        <button onClick={ handleLike }>{likeStatus ? 'Unlike' : 'Like'}</button>
        <p>{likeCount} likes</p>
        </div>
};

export default Comment;

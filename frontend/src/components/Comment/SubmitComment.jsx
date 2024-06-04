// import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createComment } from "../../services/comments";

export const SubmitComment = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const token = props.token;
    const postId = props.postId;
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newComment = await createComment(token, message, postId);
            props.handleCommentCreated(newComment)
            setMessage("");
            navigate("/posts");
        } catch (err) {
            console.error(err);
            navigate("/posts");
        }
        
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                name="message"
                value={message}
                placeholder="Add a comment..."
                onChange={(event) => setMessage(event.target.value)}></textarea>
                <br />
                <button type="submit">Create Comment</button>
            </form>
        </div>
    );
};

export default SubmitComment;
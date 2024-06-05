import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/posts';

export const SubmitPost = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const token = props.token;
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newPost = await createPost(token, message);
            props.onPostCreated(newPost);
            setMessage("");
            //navigate("/posts");
        } catch (err) {
            console.error(err);
            //navigate("/posts");
        }
        
    };

    return(
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                name="message"
                value={message}
                placeholder="What's on your mind..."
                onChange={(event) => setMessage(event.target.value)}></textarea>
                <br />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default SubmitPost;
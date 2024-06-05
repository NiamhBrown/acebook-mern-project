import { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../Post/Post";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import Navbar from "../../components/navbar/navbar"
import profilepicture from "../../assets/default_picture.png";
import "./Profile.css";
import FriendsPage from "../../pages/Friend/FriendsPage";

const Profile = ({ navigate, user }) => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [results, setResults] = useState([{forename:"Loading User"}])
    const userID = localStorage.getItem("userId") 

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    useEffect(() => {
        if (token) {
            fetch(`${BACKEND_URL}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                const posts = data.posts.filter((post) => {
                    return (
                        post.user === userID)})
                window.localStorage.setItem("token", data.token);
                setToken(data.token);
                setPosts(posts);
            })
            .catch((error) => {
                console.error('Failed to fetch posts:', error);
            });
        }
        fetch(`${BACKEND_URL}/users`) 
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
            .then((json) => {
                console.log(json)
                    const results = json.users.filter((user) => {
        
                    return (
                        user._id === userID
                    );
                });
                setResults(results);
            })
    }, [token]);

    return token ? (
        <>
        
            <Navbar/>
                <main className="profile-main">
                    <div className="divider"></div>
                    <img src={profilepicture} alt="page logo" id="default_img" style={{ width: '200px', height: '200px' }}/>
                    <h1>{results[0].forename} {results[0].surname}</h1>
                    <h2 className="post-heading">Posts</h2>
                    <div className="profile-container" role="profile">
                        {posts.map(post => (
                            <Post key={post._id} post={post} token={token} user={user} />
                        ))}
                        <FriendsPage/>
                    </div>
                </main>
        </>
    ) : null;
};

export default Profile;


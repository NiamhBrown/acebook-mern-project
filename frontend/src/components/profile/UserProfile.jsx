import { useState, useEffect } from "react";
import { Link , useNavigate, useParams} from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../Post/Post";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import Navbar from "../../components/navbar/navbar"
import profilepicture from "../../assets/default_picture.png";
import "./Profile.css";
import { Friend } from "../../components/Friend";
import { addFriend, removeFriend } from "../../services/users";
import FriendToggle from "./FriendToggle";



const UserProfile = ({ navigate, user}) => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [results, setResults] = useState([{forename:"Loading User"}])
    let userID = useParams().userid
    let ID = localStorage.getItem("userId")
    //const initialFriendStatus = user.friends.includes(userID)
    //const [friendStatus, setFriendStatus] = useState(initialFriendStatus);

    useEffect(() => {
        console.log("this is userid",userID)
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
                console.log('this is results userprofile',results)
            })
    }, [token, userID]);
    
    
    
    
    // const handleAdd = async () => {
    //     if (friendStatus == false) {
        
    //     try {
    //         await addFriend(token, userID);
    //         //navigate("/friends");
    //     } catch (err) {
    //         console.error(err);
    //         //navigate("/friends");
    //     }
    //     } else if (friendStatus == true) {
    //         try {
    //         await removeFriend(token, userID);
    //         //navigate("/friends");
    //     } catch (err) {
    //         console.error(err);
    //         //navigate("/friends");
        
    //     }}
    //     setFriendStatus(!friendStatus)}
    
    

    return token ? (
        <>
            <Navbar/>
                <main className="profile-main">
                    <div className="divider"></div>
                    <img src={profilepicture} alt="default picture" id="default_pic_img" style={{ width: '100px', height: '100px' }}/>
                    <h1>{results[0].forename} {results[0].surname}</h1>
                    <FriendToggle friendId={userID} userId={ID} user={results[0]}/>                  
                    <h2 className="post-heading">Posts</h2>
                    <div className="profile-container" role="profile">
                        {posts.map(post => (
                            <Post key={post._id} post={post} token={token} user={user} />
                        ))}
                    </div>
                </main>
        </>
    ) : null;
};

export default UserProfile;



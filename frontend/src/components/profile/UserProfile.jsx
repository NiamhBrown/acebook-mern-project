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
    const [friendUser, setfriendUser] = useState({forename:"Loading User", friends:[]})
    const [signedinuser, setSignedInUser] = useState({friends:[]})
    let friendUserId = useParams().userid
    let userId = localStorage.getItem("userId")
    const initialFriendStatus = signedinuser.friends.includes(friendUserId);
    const [isFriend, setIsFriend] = useState(initialFriendStatus);
    

    useEffect(() => {
        console.log("this is userid",friendUserId)
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
                        post.user === friendUserId)})
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
                console.log("json",json)
                    const friendUser = json.users.filter((user) => {
        
                    return (
                        user._id === friendUserId //other users profile 
                        

                    );
                });
                const signedinuser = json.users.filter((user) => {
        
                    return (
                        user._id === userId // Logged in profile
                        

                    );
                });
                
                setfriendUser(friendUser[0]);
                setSignedInUser(signedinuser[0])
                console.log('this is friend user  ',friendUser)
                console.log('this is signed in user ',signedinuser)
            }).then((signedinuser)=>{
            if (signedinuser) {

                //const newIsFriend = signedinuser.friends.includes(friendUserId);
                setIsFriend(!isFriend);
    }})
    }, [token, friendUserId, userId]
    );


    
    
    
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
                    <h1>{friendUser.forename} {friendUser.surname}</h1>
                    <FriendToggle friendId={friendUserId} userId={userId} user={friendUser} isFriend={isFriend}/>                  
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



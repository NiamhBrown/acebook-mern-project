import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../Post/Post";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Navbar from "../../components/navbar/navbar"
import ProfilePictureUpload from "../ProfilePicture/ProfilePictureUpload";
import { getOneUser } from "../../services/users";
import FriendsPage from "../../pages/Friend/FriendsPage";

export const Profile = () => {
    const [posts, setPosts] = useState([]);
    const userId = localStorage.getItem("userId") 
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [signedInUser, setSignedInUser] = useState({forename: 'loading', username: 'loading'})

    useEffect(() => {
        if (token) {
            getPosts(token)
                .then((data) => {
                    const posts = data.posts.filter((post) => {
                        return (
                            post.user === userId)
                    })
                    setPosts(posts);
                    setToken(data.token);
            })
            .catch((err) => {
                console.error(err);
                navigate("/login");
            });
        }
        }, []);
    
    useEffect(() => {
        if (token) {
            getOneUser(token)
                .then((data) => {
                    setSignedInUser(data.user[0]);
                    localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        }, []);

    return token ? (
        <>
            <Navbar/>
                <main className="profile-main">
                    <div className="profile-header">
                        <ProfilePicture userId={userId}/>
                        <ProfilePictureUpload token={token}/> 
                        <h1>{signedInUser.forename} {signedInUser.surname}</h1>
                    </div>
                    <h2 className="post-heading">Posts</h2>
                    <div className="profile-container" role="profile">
                        {posts.map(post => (
                            <Post key={post._id} post={post} token={token} user={signedInUser} />
                        ))}
                        <FriendsPage/>
                    </div>
                </main>
        </>
    ) : null;
};

export default Profile;


import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../Post/Post";
import Navbar from "../../components/navbar/navbar"
import profilepicture from "../../assets/default_picture.png";
import "./Profile.css";
import ProfilePictureUpload from "../ProfilePicture/ProfilePictureUpload";
import { getOneUser } from "../../services/users";




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

    console.log("USER POSTS !!!", posts)
    
    useEffect(() => {
        if (token) {
            getOneUser(token)
                .then((data) => {
                    console.log("!!!THIS IS DATA", data)
                    setSignedInUser(data.user[0]);
                    localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        }, []);

        console.log("THIS IS SIGNED IN USER", signedInUser.profilePicture)

    return token ? (
        <>
        
            <Navbar/>
                <main className="profile-main">
                    <div className="divider"></div>
                    <img src={signedInUser.profilePicture} alt="page logo" style={{ width: '200px', height: '200px' }}/>
                    {/* <img src={signedInUser.profilePicture || profilepicture} alt="page logo" id="default_img" style={{ width: '200px', height: '200px' }}/> */}
                    <ProfilePictureUpload token={token}/> 
                    <h1>{signedInUser.forename} {signedInUser.surname}</h1>
                    <h2 className="post-heading">Posts</h2>
                    <div className="profile-container" role="profile">
                        {posts.map(post => (
                            <Post key={post._id} post={post} token={token} user={signedInUser} />
                        ))}
                    </div>
                </main>
        </>
    ) : null;
};

export default Profile;


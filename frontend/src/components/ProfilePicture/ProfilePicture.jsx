import { useState, useEffect } from "react";
import defaultProfilePicture from "../../assets/default_picture.png";

import { getOneUser } from "../../services/users";


export const ProfilePicture = ({token}) => {


    const [signedInUser, setSignedInUser] = useState({forename: 'loading', username: 'loading'})

    const serverUrl = "http://localhost:3000";
    const profileImageUrl = signedInUser.profilePicture 
    ? `${serverUrl}${signedInUser.profilePicture}` 
    : defaultProfilePicture;
    
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

        console.log("THIS IS SIGNED IN USER profile pic", signedInUser.profilePicture)

    return token ? (
            <img src={profileImageUrl} alt="User's profile pic" style={{ width: '200px', height: '200px' }} />
    ) : null;
};

export default ProfilePicture;


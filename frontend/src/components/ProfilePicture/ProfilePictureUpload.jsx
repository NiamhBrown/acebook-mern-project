import React, { useState } from "react";
import { uploadProfilePicture } from "../../services/users";

const ProfilePictureUpload = ({ token }) => {
    const [profilePicture, setProfilePicture] = useState(null)

    const handleFileChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const data = await uploadProfilePicture(token, profilePicture);
            console.log("Profile picture uploaded:", data);
        } catch (err) {
            console("Error uploading profile picture:", err);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Add Profile Picture</button>
        </div>
    );
};

export default ProfilePictureUpload;
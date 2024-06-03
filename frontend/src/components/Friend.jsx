import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import profilepicture from "../assets/default_picture.png";


export const Friend = ({friend}) => {
    return (
        <div>
            <img src={profilepicture} alt="default picture" id="default_pic_img" style={{ width: '100px', height: '100px' }}/>

            <h2>{friend.forename} {friend.surname}</h2>
            <Link to = {`/profile/${friend._id}`}>Account</Link>
        </div>
    )

};
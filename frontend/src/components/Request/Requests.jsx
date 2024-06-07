// get all users

// filter where userID is not in otheruser friends list
//          also where user id != user id

// list => Request componenet

//Request Component:

// other User details
// approve button - post(/friends) => signedin user database
//Deny button - delete(/friends) => otheruser database
import React from "react";
import { addFriend, denyFriend, removeFriend } from "../../services/users";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import "../../../css/post.css"
import "../../../css/main.css"

export const Request = ({user, currentUser }) => {
    const token = localStorage.getItem("token")
    const handleApprove = async() => {
        addFriend(token, user._id)
        window.location.reload();
    }

    
    const handleDeny = async()=> {
        denyFriend(token, user._id)
        window.location.reload();
    }

        return (
            <div className="request">
                <ProfilePicture userId={user._id}/>
                <p>{user.forename} {user.surname}</p>
                <button onClick={handleApprove}>Approve</button> 
                <button onClick={handleDeny}>Deny</button>
            </div>
        )

    
}
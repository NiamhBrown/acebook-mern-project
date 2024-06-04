import React, { useState, useEffect} from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from 'react-router-dom';


function FriendToggle({ userId, friendId, user, isFriend}) {
    console.log(user)
    console.log('user friends', user.friends)
    const friends = user.friends
    console.log(friends, "friends")
    const [localIsFriend, setLocalIsFriend] = useState(isFriend); // Use prop for initial state
    

    const handleAdd = () => {
        setLocalIsFriend(!localIsFriend);
        const url = `${BACKEND_URL}/users/friends`;
        const method = localIsFriend ? 'DELETE' : 'POST'; // DELETE to unfriend, POST to add friend
        let token = localStorage.getItem('token');
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({friendUserId: friendId})
        })
        .then(response => {
            console.log('friendid',friendId)
            console.log('this is response',response)
            if (!response.ok) {
                console.log("this is response line 25",response)
                throw new Error('Network response was not ok');
                
            }
            return response.json();
        })
        .then(data => {
            console.log('Friend status updated:', data);
        })
        .catch(error => {
            setLocalIsFriend(!localIsFriend);
            console.error('Error updating friend status:', error);
        });
    };
    ;
    return (
        <button onClick={handleAdd}>
            {localIsFriend ? 'Unfriend' : 'Add Friend'}
        </button>
    );
}

export default FriendToggle;

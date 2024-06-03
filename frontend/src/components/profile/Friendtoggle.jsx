import React, { useState } from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function FriendToggle({ userId, friendId }) {
    // State to track if the current user is friends with the other user
    const [isFriend, setIsFriend] = useState(false); // Assuming default not friends

    const handleAdd = () => {
        // Toggle the friend status
        setIsFriend(!isFriend);

        // Send a request to the server to update the friend status
        const url = `${BACKEND_URL}/friends`;
        const method = isFriend ? 'DELETE' : 'POST'; // Assuming DELETE to unfriend, POST to add friend
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ friendUserId: friendId , userId : userId})
        })
        .then(response => {
            if (!response.ok) {
                console.log(results)
                throw new Error('Network response was not ok');
                
            }
            return response.json();
        })
        .then(data => {
            console.log('Friend status updated:', data);
        })
        .catch(error => {
            console.error('Error updating friend status:', error);
            setIsFriend(current => !current); // Revert state change on error
        });
    };

    return (
        <button onClick={handleAdd}>
            {isFriend ? 'Unfriend' : 'Add Friend'}
        </button>
    );
}

export default FriendToggle;

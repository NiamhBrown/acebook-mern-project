import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Friend } from "../../components/Friend";
import { addFriend, removeFriend } from "../../services/users";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const FriendsPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userId");
    

    useEffect(() => {
        fetch(`${BACKEND_URL}/users`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((json) => {
                const results = json.users.filter((user) => {
                    return (
                        user &&
                        user.friends.includes(userID)
                    );
                });
                setResults(results);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [userID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h1>Friends</h1>
            {results.length > 0 ? (
                results.map((friend) => (
                    <div key={friend.id}>
                        <Friend friend={friend} />
                    </div>
                ))
            ) : (
                <p>No friends found.</p>
            )}
        </>
    );
};


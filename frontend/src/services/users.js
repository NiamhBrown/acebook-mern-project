const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUsers = async (token) => {
    const requestOptions = {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    },
};

const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

if (response.status !== 200) {
    throw new Error("Unable to fetch users");
}

const data = await response.json();
return data;
};

export const addFriend = async (token=null, friendUserId) => {
    const payload = {
        token: token,
        friendUserId: friendUserId
    
    };
    // console.log("this is PAYLOAD", payload);
    // console.log("this is frienduserID", payload.friendUserId);
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    let response = await fetch(`${BACKEND_URL}/users/friends`, requestOptions);
    if (response.status !== 200) {
    throw new Error("Unable to add friend");
    } else {
    return;
    }
};


export const removeFriend = async (token, friendUserId) => {
    const payload = {
        token: token,
        friendUserId: friendUserId
    
    };
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    let response = await fetch(`${BACKEND_URL}/users/friends`, requestOptions);
    if (response.status !== 200) {
    throw new Error("Unable to remove friend");
    } else {
    return;
    }
};

export const denyFriend = async (token, friendUserId) => {
    const payload = {
        token:token,
        friendUserId: friendUserId
    };
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    }
    let response = await fetch(`${BACKEND_URL}/users/friends/deny`, requestOptions);
    if (response.status !== 200) {
        throw new Error("Unable to remove friend");
        } else {
        return;
        }
};

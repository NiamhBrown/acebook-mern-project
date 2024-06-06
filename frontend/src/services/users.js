const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllUsers = async (token) => {
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

export const getOneUser = async (token) => {
    const requestOptions = {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    },
};

const response = await fetch(`${BACKEND_URL}/users/getOneUser`, requestOptions);

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

export const uploadProfilePicture = async (token, file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    };

    const response = await fetch(`${BACKEND_URL}/users/profilePicture`, requestOptions);
    if (response.status !==200) {
        throw new Error("Unable to add profile picture");
    } else {
        return await response.json();
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


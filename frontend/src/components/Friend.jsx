import { Link } from 'react-router-dom';
import ProfilePicture from "./ProfilePicture/ProfilePicture";


export const Friend = ({friend}) => {
    return (
        <div>
            <ProfilePicture userId={friend._id}/>
            <Link to = {`/profile/${friend._id}`}>{friend.forename} {friend.surname}</Link>
        </div>
    )

};
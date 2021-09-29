import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

const MyProfile = () => {
    const user = useSelector(selectUser);
    return (
            <div>{user.displayName}</div>
    );
};

export default MyProfile;
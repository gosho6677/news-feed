import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import CreateIcon from '@mui/icons-material/Create';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "../LoadingBar/LoadingBar";
import { getPostsThunk } from '../../features/posts/postsSlice';
import SortBy from './SortBy';

const Profile = ({ postsCriteria, setPostsCriteria }) => {
    const user = useSelector(state => state.user.user);
    const status = useSelector(state => state.user.status);
    const dispatch = useDispatch();

    if (status === 'loading') {
        return <LoadingBar />;
    }

    const refetchPostsHandler = e => {
        dispatch(getPostsThunk());
    };

    return (
        <Box component="aside" className="profile">
            <Card className="profile-card">
                <Typography sx={{
                    maxWidth: '100%',
                    textAlign: 'center',
                    marginBottom: '5px'
                }}
                    variant="h6"
                >
                    {user?.displayName}
                </Typography>
                <Avatar
                    variant="rounded"
                    srcSet={user?.photoURL}
                    alt="profile pic"
                    className="profile-card-avatar">
                    {user?.displayName.slice(0, 1).toUpperCase()}
                </Avatar>
                <Divider className="profile-divider" />
                <div className="profile-card-user">
                    <Typography className="profile-card-user-p" variant="body1">
                        <CreateIcon /> {user?.userEmail}
                    </Typography>
                </div>
            </Card>
            <Button onClick={refetchPostsHandler} variant="contained">Refresh posts<RefreshIcon /></Button>
            <SortBy postsCriteria={postsCriteria} setPostsCriteria={setPostsCriteria} />
        </Box>
    );
};

export default Profile;
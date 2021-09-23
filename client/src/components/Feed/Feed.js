import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Profile from './Profile';
import News from './News';
import './Feed.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from '../../features/posts/postsSlice';
import { useEffect } from 'react';
import LoadingBar from '../LoadingBar/LoadingBar';

const Feed = () => {
    const posts = useSelector(state => state.posts.posts);
    const status = useSelector(state => state.posts.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if(status === 'idle') {
            dispatch(getPostsThunk());
        }
    }, [dispatch, status]);

    if(status === 'loading') {
        return <LoadingBar />;
    }

    return (
        <Container component="main" className="feed">
            <Profile />
            <News posts={posts} />
            {/* todo: throw it in its own component */}
            <Box component="aside" className="events">
                <Typography paragraph>adsdsads</Typography>
            </Box>
        </Container>
    );
};

export default Feed;
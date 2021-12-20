import Container from '@mui/material/Container';

import Profile from './Profile';
import News from './News';
import './Feed.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk, selectAllPosts, selectMyPosts } from '../../features/posts/postsSlice';
import { useEffect, useState } from 'react';
import LoadingBar from '../LoadingBar/LoadingBar';
import ErrorBox from '../Notifications/ErrorBox';

const Feed = () => {
    // changed by the user preference of all posts or only user posts
    const [postsCriteria, setPostsCriteria] = useState('all-posts');
    const posts = useSelector(selectAllPosts);
    const myPosts = useSelector(selectMyPosts);
    const status = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getPostsThunk());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return <LoadingBar />;
    }
    
    return (
        <Container component="main" className="feed">
            {error && <ErrorBox error={error} />}
            {/* passing postsCriteria down as props for the sortBy component */}
            <Profile postsCriteria={postsCriteria} setPostsCriteria={setPostsCriteria} />
            <News posts={postsCriteria === 'all-posts' ? posts : myPosts} />
        </Container>
    );
};

export default Feed;
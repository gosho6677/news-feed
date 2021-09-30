import Container from '@mui/material/Container';

import Profile from './Profile';
import News from './News';
import './Feed.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk, selectMyPosts } from '../../features/posts/postsSlice';
import { useEffect, useState } from 'react';
import LoadingBar from '../LoadingBar/LoadingBar';
import ErrorBox from '../Notifications/ErrorBox';
import { removeError } from '../../features/user/userSlice';
import SortBy from './SortBy';

const Feed = () => {
    // changed by the user preference of all posts or only user posts
    const [postsCriteria, setPostsCriteria] = useState('all-posts');
    const posts = useSelector(state => state.posts.posts);
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
            {error && <ErrorBox error={error} removeError={removeError} />}
            <Profile />
            <News posts={postsCriteria === 'all-posts' ? posts : myPosts} />
            <SortBy postsCriteria={postsCriteria} setPostsCriteria={setPostsCriteria} />
        </Container>
    );
};

export default Feed;
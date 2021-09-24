import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreatePost from './CreatePost';

import NewsCard from './NewsCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../features/user/userSlice';
import { deletePostThunk, dislikePostThunk, likePostThunk } from '../../features/posts/postsSlice';

const News = ({ posts }) => {
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();

    const eventHandler = async e => {
        const tag = e.target.tagName;
        const val = e.target.textContent;
        let postId;

        if (tag === 'svg' || tag === 'path') {
            // delete post
            postId = e.target.closest('button').dataset.id;
            dispatch(deletePostThunk(postId));
        } else if (tag === 'BUTTON' && val === 'Like') {
            // like post
            postId = e.target.parentElement.dataset.id;
            dispatch(likePostThunk({ postId, userId }));
        } else if (tag === 'BUTTON' && val === 'Dislike') {
            postId = e.target.parentElement.dataset.id;
            dispatch(dislikePostThunk({ postId, userId }));
        }
    };

    return (
        <Box component="section" className="news">
            <CreatePost />
            <Grid
                // finish delete request via event delegation
                onClick={eventHandler}
                className="news-cards-container"
                direction="column"
                container
            >
                {posts?.length
                    ? posts.map(p => <NewsCard key={p._id} post={p} userId={userId} />)
                    : <Typography variant="h2">No posts available at this moment...</Typography>
                }
            </Grid>
        </Box>
    );
};

export default News;
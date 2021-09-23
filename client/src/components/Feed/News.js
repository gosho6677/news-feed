import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreatePost from './CreatePost';

import NewsCard from './NewsCard';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../features/user/userSlice';

const News = ({ posts }) => {
    const userId = useSelector(selectUserId);

    return (
        <Box component="section" className="news">
            <CreatePost />
            <Grid
                // finish delete request via event delegation
                onClick={e => console.log(e.target)}
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
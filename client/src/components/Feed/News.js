import { Button, Grid, Input, Paper, TextareaAutosize, Typography, Box } from '@mui/material';

import NewsCard from './NewsCard';

const News = ({ posts }) => {

    return (
        <Box component="section" className="news">
            <Paper className="news-post">
                <Typography variant="body1">Status:</Typography>
                <TextareaAutosize
                    id="outlined-basic"
                    className="news-post-desc"
                    label="Outlined"
                    variant="outlined"
                />
                <div className="news-inputs">
                    <Input className="news-post-imgUrl" placeholder="Image URL" />
                    <Button variant="contained" className="news-post-btn">POST</Button>
                </div>
            </Paper>

            <Grid className="news-cards-container" container direction="column">
                {posts?.length 
                    ? posts.map(p => <NewsCard key={p._id} post={p} />)
                    : <Typography variant="h2">No posts available at this moment...</Typography>
                }
            </Grid>
        </Box>
    );
};

export default News;
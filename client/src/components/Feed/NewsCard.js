import { Avatar, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineTwoToneIcon from '@mui/icons-material/ChatBubbleOutlineTwoTone';

const NewsCard = ({ post }) => {
    return (
        <Grid className="news-card" item>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography className="news-card-user" display="inline-block" variant="h5">
                    <Avatar
                        sx={{ width: 60, height: 60 }}
                        display="inline-block"
                        srcSet={post.owner.photoUrl}
                    >
                        {post.owner.displayName.slice(0, 1).toUpperCase()}
                    </Avatar>
                </Typography>
                <Typography display="inline-block" paragraph>{post.owner.displayName}</Typography>
            </Stack>
            <Divider className="profile-divider" />
            <Typography className="news-card-desc" paragraph>
                {post.content}
            </Typography>
            <img
                className="news-card-img"
                src={post.imageUrl}
                alt="post"
            />
            <Typography className="news-card-likes" variant="h6">
                <FavoriteBorderIcon /> {post.likes.length} likes
                <ChatBubbleOutlineTwoToneIcon sx={{ marginLeft: '2rem' }} /> {post.comments.length} comments
            </Typography>
            <Stack direction="row" spacing={1}>
                {/* todo: like/comment functionality */}
                <Button variant="contained" className="news-post-btn">Like</Button>
                <Button variant="contained" className="news-post-btn">Comment</Button>
            </Stack>
        </Grid>
    );
};

export default NewsCard;
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineTwoToneIcon from '@mui/icons-material/ChatBubbleOutlineTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const NewsCard = ({ post, userId }) => {
    return (
        <Grid className="news-card" item>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography className="news-card-user" variant="h5">
                    <Avatar
                        sx={{ width: 60, height: 60 }}
                        display="inline-block"
                        srcSet={post.owner.photoUrl}
                    >
                        {post.owner.displayName.slice(0, 1).toUpperCase()}
                    </Avatar>
                </Typography>
                <Typography paragraph>{post.owner.displayName}</Typography>
                {post.owner._id === userId &&
                    <Tooltip title="Delete" sx={{ position: 'relative', left: '70%', bottom: '5px' }}>
                        <IconButton>
                            <HighlightOffIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                }
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
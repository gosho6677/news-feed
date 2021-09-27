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

import { useState } from 'react';
import Comment from './Comment';
import AddComment from './AddComment';

const NewsCard = ({ post, userId }) => {
    const [likeDisabled, setLikeDisabled] = useState(false);
    const [dislikeDisabled, setDislikeDisabled] = useState(false);
    const [display, setDisplay] = useState('none');
    const hasLiked = post.likes.includes(userId);

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
                        <IconButton data-id={post._id}>
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
            <Stack direction="row" spacing={1} data-id={post._id}>
                {hasLiked
                    ? <Button
                        variant="contained"
                        className="news-post-btn"
                        disabled={dislikeDisabled}
                        onClick={() => {
                            setDislikeDisabled(true);
                            setLikeDisabled(false);
                        }}>
                        Dislike
                    </Button>
                    : <Button
                        variant="contained"
                        className="news-post-btn"
                        disabled={likeDisabled}
                        onClick={() => {
                            setLikeDisabled(true);
                            setDislikeDisabled(false);
                        }}>
                        Like
                    </Button>
                }
                <Button
                    onClick={() => setDisplay(old => old === 'none' ? 'block' : 'none')}
                    variant="contained"
                    className="news-post-btn"
                >
                    Comments
                </Button>
            </Stack>
            <Grid display={display} sx={{ mt: '1rem' }} container>
                <AddComment postId={post._id} />
                {post.comments.length 
                    ? post.comments.map(c => <Comment key={c._id} comment={c} />)
                    : <Typography variant="h5">No comments yet...</Typography>}
            </Grid>
        </Grid>
    );
};

export default NewsCard;
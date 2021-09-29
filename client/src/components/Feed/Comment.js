import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../features/posts/postsSlice';

const Comment = ({ comment, isPostOwner, isCommentOwner, postId }) => {
    const dispatch = useDispatch();

    const deleteCommentHandler = () => {
        dispatch(deleteCommentThunk({ postId, commentId: comment._id }));
    };

    return (
        <Grid item sx={{ m: '.2rem 0', p: '.5rem' }}>
            <Stack direction="row">
                <Avatar
                    srcSet={comment?.owner.photoUrl}
                    alt="profile pic"
                    sx={{ width: 48, height: 48 }}
                >
                    {comment?.owner.displayName.slice(0, 1).toUpperCase()}
                </Avatar>
                <Stack direction="column" sx={{
                    background: '#b9c1c99a',
                    p: 1,
                    m: 0.5,
                    borderRadius: '10px'
                }}>
                    <Typography paragraph sx={{ m: 0 }}>{comment?.owner.displayName} commented: </Typography>
                    <Typography
                        sx={{ wordBreak: 'break-all', m: 0 }}
                        paragraph>
                        {comment?.description}
                    </Typography>
                </Stack>
                {(isPostOwner || isCommentOwner) && <Button onClick={deleteCommentHandler} variant="text" sx={{ color: 'gray' }}>Delete</Button>}
            </Stack>
        </Grid>);
};

export default Comment;
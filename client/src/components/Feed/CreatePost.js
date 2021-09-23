import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostThunk } from '../../features/posts/postsSlice';
import { selectUserId } from '../../features/user/userSlice';

const CreatePost = () => {
    const [status, setStatus] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);

    const createPostHandler = async e => {
        dispatch(createPostThunk({
            content: status,
            ownerId: userId,
            imageUrl
        }));
    };

    return (
        <Paper className="news-post">
            <Typography variant="body1">Status:</Typography>
            <TextareaAutosize
                id="outlined-basic"
                className="news-post-desc"
                label="Outlined"
                variant="outlined"
                value={status}
                onChange={e => setStatus(e.target.value)}
            />
            <Stack direction="row" className="news-inputs">
                <Input
                    className="news-post-imgUrl"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                />
                <Button onClick={createPostHandler} variant="contained" className="news-post-btn">POST</Button>
            </Stack>
        </Paper>
    );
};

export default CreatePost;
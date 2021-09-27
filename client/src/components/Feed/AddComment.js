import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentPostThunk } from '../../features/posts/postsSlice';

const AddComment = ({ postId }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const addCommentHandler = (e) => {
        e.preventDefault();

        if(!comment) {
            return;
        }

        dispatch(commentPostThunk({ postId, description: comment }));
        setComment('');
    };

    return (
        <Grid item>
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="5px"
                onSubmit={addCommentHandler}
            >
                <TextareaAutosize
                    placeholder="Write comment here..."
                    maxLength={1000}
                    style={{ width: '70%', padding: '5px' }}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#94999b' }}
                >
                    Comment
                </Button>
            </Box>
        </Grid>
    );
};

export default AddComment;
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortPosts } from '../../features/posts/postsSlice';

const SortBy = ({ postsCriteria, setPostsCriteria }) => {
    const [sortCriteria, setSortCriteria] = useState('recent');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sortPosts(sortCriteria));
    }, [sortCriteria, dispatch]);

    const sortCriteriaHandler = e => {
        setSortCriteria(e.target.value);
    };

    const showPostsCriteriaHandler = (e) => {
        setPostsCriteria(e.target.value);
    };

    return (
        <Box component="aside" sx={{ width: '180px' }}>
            <Typography paragraph>Sort by:</Typography>
            <FormControl sx={{ width: "100%" }}>
                <Select
                    id="demo-simple-select"
                    value={sortCriteria}
                    onChange={sortCriteriaHandler}
                >
                    <MenuItem value="recent">Recent</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                    <MenuItem value="most-liked">Most liked</MenuItem>
                    <MenuItem value="least-liked">Least liked</MenuItem>
                    <MenuItem value="most-commented">Most commented</MenuItem>
                </Select>
            </FormControl>

            <ToggleButtonGroup
                color="primary"
                value={postsCriteria}
                exclusive
                onChange={showPostsCriteriaHandler}
            >
                <ToggleButton value="my-posts">My posts</ToggleButton>
                <ToggleButton value="all-posts">All posts</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default SortBy;
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortPosts } from '../../features/posts/postsSlice';

const SortBy = () => {
    const [sortCriteria, setSortCriteria] = useState('recent');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sortPosts(sortCriteria));
    }, [sortCriteria, dispatch]);

    const sortCriteriaHandler = e => {
        console.log(e.target.value);
        setSortCriteria(e.target.value);
    };

    return (
        <Box component="aside" className="events">
            <Typography paragraph>Sort by:</Typography>
            <FormControl sx={{ width: '180px'}}>
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
        </Box>
    );
};

export default SortBy;
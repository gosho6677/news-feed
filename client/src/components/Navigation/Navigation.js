import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/user/userSlice';

const Navigation = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        dispatch(logoutUser());
    };

    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: 'black' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink className="nav-links" to="/">News Feed</NavLink>
                        </Typography>
                        {user
                            ? <>
                                <Button color="inherit"><NavLink className="nav-links" to="/profile"> Welcome, {user.displayName} !</NavLink></Button>
                                <Button color="inherit" onClick={logoutHandler}><NavLink className="nav-links" to="/"> Logout </NavLink></Button>
                            </>
                            : <>
                                <Button color="inherit"><NavLink className="nav-links" to="/auth/login"> Login </NavLink></Button>
                                <Button color="inherit"><NavLink className="nav-links" to="/auth/register"> Register </NavLink></Button>
                            </>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
};

export default Navigation;
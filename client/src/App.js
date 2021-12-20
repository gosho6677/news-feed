import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import './App.css';

import { Counter } from './features/counter/Counter';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import Feed from './components/Feed/Feed';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import isGuest from './guards/isGuest';
import { commentPostSync, createPostSync, deleteCommentSync, deletePostSync, dislikePostSync, likePostSync } from './features/posts/postsSlice';

const App = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        const socket = io('ws://localhost:5000');

        socket.on('connnection', () => {
            console.log('connected to server');
        });
        socket.on('post/add', post => {
            dispatch(createPostSync(post));
        });
        socket.on('post/delete', postId => {
            dispatch(deletePostSync(postId));
        });
        socket.on('post/like-add', (info) => {
            dispatch(likePostSync(info));
        });
        socket.on('post/like-delete', (info) => {
            dispatch(dislikePostSync(info));
        });
        socket.on('post/comment-add', info => {
            dispatch(commentPostSync(info));
        });
        socket.on('post/comment-delete', info => {
            dispatch(deleteCommentSync(info));
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnecting');
        });
    }, [dispatch]);

    useEffect(() => {
        // this observer works as route guard and on successful register/login redirect 
        auth.onAuthStateChanged(userCredential => {
            if (userCredential && (location.pathname === '/auth/register' || location.pathname === '/auth/login')) {
                history.push('/');
            } else if (!userCredential && location.pathname === '/') {
                history.push('/auth/login');
            }

            return;
        });
    }, [location, history, dispatch, user]);

    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <Navigation />
            <Switch>
                <Route path='/' exact component={isGuest(Feed)} />
                <Route path='/auth/login' exact component={Login} />
                <Route path='/auth/register' exact component={Register} />
                <Route path='/test' exact component={Counter} />
                <Route path='*' render={() => <h1 style={{ textAlign: 'center' }}>Page not found...</h1>} />
            </Switch>
        </StyledEngineProvider>
    );
};

export default App;

import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import './App.css';

import { Counter } from './features/counter/Counter';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';

import Feed from './components/Feed/Feed';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import isGuest from './guards/isGuest';

const App = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

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
            </Switch>
        </StyledEngineProvider>
    );
};

export default App;

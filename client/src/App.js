import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Feed from './components/Feed/Feed';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Counter } from './features/counter/Counter';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUserOnLoad } from './features/user/userSlice';

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
            }

            // change it to different method because it causes unnecessary dispatches...
            if (userCredential && !user) {
                dispatch(setUserOnLoad({
                    accessToken: userCredential.accessToken,
                    displayName: userCredential.displayName,
                    userEmail: userCredential.email,
                    photoURL: userCredential.photoURL,
                }));
            }
            return;
        });
    }, [location, history, dispatch, user]);

    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <Navigation />
            <Switch>
                <Route path='/' exact component={Feed} />
                <Route path='/auth/login' exact component={Login} />
                <Route path='/auth/register' exact component={Register} />
                <Route path='/test' exact component={Counter} />
            </Switch>
        </StyledEngineProvider>
    );
};

export default App;

import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import { Counter } from './features/counter/Counter';
import Feed from './components/Feed/Feed';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import isGuest from './guards/isGuest';
import useSocket from './hooks/useSocket';
import useRouteGuard from './hooks/useRouteGuard';

const App = () => {
    // trigger route guard
    useRouteGuard();

    // trigger socket connection
    useSocket();

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

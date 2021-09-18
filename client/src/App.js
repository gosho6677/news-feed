import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Switch, Route } from 'react-router-dom';
import Feed from './components/Feed/Feed';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const App = () => {
    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <Navigation />
            <Switch>
                <Route path='/' exact component={Feed} />
                <Route path='/auth/login' exact component={Login} />
                <Route path='/auth/register' exact component={Register} />
            </Switch>
        </StyledEngineProvider>
    );
};

export default App;

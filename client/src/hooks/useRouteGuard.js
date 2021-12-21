import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { auth } from '../firebase';

const useRouteGuard = () => {
    const user = useSelector(state => state.user.user);
    const location = useLocation();
    const history = useHistory();

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

    }, [location, history, user]);
};

export default useRouteGuard;
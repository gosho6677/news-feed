import { Redirect } from "react-router";
import { auth } from "../firebase";

const isGuest = WrappedComponent => {
    const Component = props => {
        const user = auth.currentUser;

        if (!user) {
            return <Redirect to="auth/login" />;
        }

        return <WrappedComponent {...props} />;
    };

    return Component;
};

export default isGuest;
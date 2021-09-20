import firebase from '../../firebase';
import { auth } from '../../firebase';

export const register = async ({ email, name, password, rePass, photoUrl }) => {
    if(password !== rePass) {
        throw new Error('Passwords must match!');
    }

    await firebase.register(auth, email, password);

    
    await firebase.updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl
    });
    
    const userCredential = auth.currentUser;

    return {
        accessToken: userCredential.accessToken,
        displayName: userCredential.displayName,
        userEmail: userCredential.email,
        photoURL: userCredential.photoURL,
    };
};

export const login = async ({ email, password }) => {
    const userCredential = await firebase.login(auth, email, password);
    return {
        accessToken: userCredential.user.accessToken,
        displayName: userCredential.user.displayName,
        userEmail: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
    };
};

export const logout = async () => {
    await firebase.logout(auth);
    return true;
};
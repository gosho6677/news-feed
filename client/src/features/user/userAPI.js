import firebase from '../../firebase';
import { auth } from '../../firebase';

export const register = async ({ email, name, password, rePass, photoUrl }) => {
    if(password !== rePass) {
        throw new Error('Passwords must match!');
    }

    await firebase.setPersistence(auth, firebase.inMemoryPersistence);
    await firebase.register(auth, email, password);
    
    await firebase.updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl
    });
    
    const userCredential = auth.currentUser;

    return {
        displayName: userCredential.displayName,
        userEmail: userCredential.email,
        photoURL: userCredential.photoURL,
        _id: userCredential.uid,
    };
};

export const login = async ({ email, password }) => {
    await firebase.setPersistence(auth, firebase.inMemoryPersistence);
    const userCredential = await firebase.login(auth, email, password);

    return {
        displayName: userCredential.user.displayName,
        userEmail: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
        _id: userCredential.user.uid,
    };
};

export const logout = async () => {
    await firebase.logout(auth);
    return true;
};
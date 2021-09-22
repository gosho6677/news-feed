const auth = require('../config/firebase');

const verifyToken = async idToken => {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
};

const getUser = async userId => {
    const user = await auth.getUser(userId);
    return user;
};


module.exports = {
    verifyToken,
    getUser,
};
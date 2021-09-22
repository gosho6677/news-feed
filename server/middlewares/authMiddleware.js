const { verifyToken, getUser } = require('../services/authServices');
// req.headers['authorization']

module.exports = () => async (req, res, next) => {
    try {
        const decodedToken = await verifyToken(req.headers['authorization']);
        const user = await getUser(decodedToken.uid);

        const userModel = {
            _id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
        };

        req.user = userModel;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ ok: false, error: 'Invalid token!' });
    }
};


const postsController = require('../controllers/postsController');

module.exports = app => {
    app.use('/posts', postsController);
};
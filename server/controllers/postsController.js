const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const posts = await req.data.getPosts();
        res.json({ ok: true, posts });
    } catch (err) {
        res.status(500).json({ ok: false, error: 'Internal error.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const content = req.body.content;
        const imageUrl = req.body.imageUrl;
        const user = req.user;

        if (content.length < 10 || !imageUrl.startsWith('https://')) {
            throw new Error('Post description must be atleast 10 characters long and image should be a valid URL!');
        }

        const post = await req.data.createPost(content, imageUrl, user);
        res.status(201).json({ ok: true, post });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        await req.data.deletePost(postId);

        res.status(201).json({ ok: true, _id: postId });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

// likes
router.post('/:postId/like', async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const post = await req.data.likePost(postId, userId);

        res.status(201).json({ ok: true, post });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

router.post('/:postId/dislike', async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const post = await req.data.dislikePost(postId, userId);

        res.status(201).json({ ok: true, post });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

// comments
router.post('/:postId/comment', async (req, res) => {
    try {
        const postId = req.params.postId;
        const user = req.user;
        const description = req.body.description;

        if(!description) {
            throw new Error('Comment can\'t be empty!');
        }

        const comment = await req.data.commentPost(postId, user, description);

        res.status(201).json({ ok: true, comment });
    } catch (err) {
        res.status(400).json({ ok: false, error: err.message });
    }
});

module.exports = router;
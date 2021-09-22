const Post = require('../models/Post');

const getPosts = async () => {
    return await Post.find({});
};

const createPost = async (content, imageUrl, owner) => {
    const post = new Post({
        content,
        imageUrl,
        owner,
        likes: [],
        iat: Date.now()
    });

    await post.save();

    return post;
};

module.exports = {
    createPost,
    getPosts,
};
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

const deletePost = async (postId) => {
    await Post.findByIdAndDelete(postId);
};

const likePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    post.likes.push(userId);

    await post.save();
    return post;
};

const dislikePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    
    const userIdx = post.likes.indexOf(userId);
    post.likes.splice(userIdx, 1);

    await post.save();
    return post;
};

module.exports = {
    createPost,
    getPosts,
    deletePost,
    likePost,
    dislikePost,
};
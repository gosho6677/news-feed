const Post = require('../models/Post');
const Comment = require('../models/Comment');

const getPosts = async () => {
    return await Post.find({}).populate('comments');
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

const commentPost = async (postId, user, description) => {
    const post = await Post.findById(postId);
    const comment = new Comment({
        description,
        owner: user,
        iat: Date.now()
    });

    post.comments.push(comment);
    await comment.save();
    await post.save();

    return comment;
};

module.exports = {
    createPost,
    getPosts,
    deletePost,
    likePost,
    dislikePost,
    commentPost,
};
import firebase from "../../firebase";

const baseUrl = 'http://localhost:5000/posts';

export const getPosts = async () => {
    const resp = await fetch(baseUrl, {
        headers: {
            'Authorization': await firebase.getToken()
        }
    });

    return await resp.json();
};

export const createPost = async ({ content, imageUrl, ownerId }) => {
    const resp = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await firebase.getToken()
        },
        body: JSON.stringify({ content, imageUrl, ownerId })
    });

    return await resp.json();
};

export const deletePost = async (postId) => {
    const resp = await fetch(`${baseUrl}/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': await firebase.getToken()
        }
    });

    return await resp.json();
};

export const likePost = async (postId) => {
    const resp = await fetch(`${baseUrl}/${postId}/like`, {
        method: 'POST',
        headers: {
            'Authorization': await firebase.getToken()
        }
    });

    return await resp.json();
};

export const dislikePost = async (postId) => {
    const resp = await fetch(`${baseUrl}/${postId}/dislike`, {
        method: 'POST',
        headers: {
            'Authorization': await firebase.getToken()
        }
    });

    return await resp.json();
};

export const commentPost = async (postId, description) => {
    const resp = await fetch(`${baseUrl}/${postId}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await firebase.getToken()
        },
        body: JSON.stringify({ description })
    });

    return await resp.json();
};

export const deleteComment = async (postId, commentId) => {
    const resp = await fetch(`${baseUrl}/${postId}/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await firebase.getToken()
        }
    });

    return await resp.json();
};
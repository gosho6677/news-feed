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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import {
    commentPostSync,
    createPostSync,
    deleteCommentSync,
    deletePostSync,
    dislikePostSync,
    likePostSync,
} from '../features/posts/postsSlice';

const useSocket = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io('wss://tranquil-taiga-19255.herokuapp.com/', {
            transports: ['websocket', 'polling']
        });

        socket.on('connnection', () => {
            console.log('connected to server');
        });
        socket.on('post/add', post => {
            dispatch(createPostSync(post));
        });
        socket.on('post/delete', postId => {
            dispatch(deletePostSync(postId));
        });
        socket.on('post/like-add', (info) => {
            dispatch(likePostSync(info));
        });
        socket.on('post/like-delete', (info) => {
            dispatch(dislikePostSync(info));
        });
        socket.on('post/comment-add', info => {
            dispatch(commentPostSync(info));
        });
        socket.on('post/comment-delete', info => {
            dispatch(deleteCommentSync(info));
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnecting');
        });
    }, [dispatch]);
};

export default useSocket;
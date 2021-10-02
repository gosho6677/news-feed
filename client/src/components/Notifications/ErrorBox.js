import { useDispatch } from 'react-redux';
import { removePostError } from '../../features/posts/postsSlice';
import { removeUserError } from '../../features/user/userSlice';
import './ErrorBox.css';

const ErrorBox = ({ error }) => {
    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     const timeOut = setTimeout(() => {
    //         dispatch(removeError());
    //     }, 10000);

    //     return () => {
    //         dispatch(removeError());
    //         clearTimeout(timeOut);
    //     };
    // }, [removeError, dispatch]);

    const errorHandler = () => {
        dispatch(removeUserError());
        dispatch(removePostError());
    };

    return (
        <div onClick={errorHandler} className="error">
            {error}
        </div>
    );
};
 
export default ErrorBox;
// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './ErrorBox.css';

const ErrorBox = ({ error, removeError }) => {
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
        dispatch(removeError());
    };

    return (
        <div onClick={errorHandler} className="error">
            {error}
        </div>
    );
};
 
export default ErrorBox;
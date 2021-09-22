import './LoadingBar.css';

const LoadingBar = () => {
    return (
        <div className="lds-ellipsis">
            <div></div><div></div><div></div><div></div>
        </div>
    );
};

export default LoadingBar;
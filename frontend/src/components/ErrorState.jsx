const ErrorState = ({ message, onRetry }) => (
    <div className="alert alert-danger text-center">
        <p className="mb-2">{message}</p>
        {onRetry && (
            <button className="btn btn-outline-danger btn-sm" onClick={onRetry}>
                Retry
            </button>
        )}
    </div>
);
export default ErrorState;
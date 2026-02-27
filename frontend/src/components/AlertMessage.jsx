const AlertMessage = ({
    type = "info",        // success | danger | warning | info
    message,
    onClose,
}) => {
    if (!message) return null;

    const typeClass = {
        success: "alert-success",
        danger: "alert-danger",
        warning: "alert-warning",
        info: "alert-info",
    };

    return (
        <div className={`alert ${typeClass[type]} d-flex justify-content-between align-items-center`}>
            <span>{message}</span>
            {onClose && (
                <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                />
            )}
        </div>
    );
};

export default AlertMessage;
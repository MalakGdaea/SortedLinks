import './AlertModal.css';

const AlertModal = ({ open, title, message, onClose, actionLabel, onAction }) => {
    if (!open) return null;

    return (
        <div className="alert-backdrop">
            <div className="alert-modal">
                <h3>{title}</h3>
                <p>{message}</p>

                <div className="alert-actions">
                    <button className="btn cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    {onAction && (
                        <button className="btn btn-primary" onClick={onAction}>
                            {actionLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlertModal;

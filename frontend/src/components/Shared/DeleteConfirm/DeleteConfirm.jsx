import './DeleteConfirm.css';

const DeleteConfirm = ({ title, description, onConfirm, onCancel, isLoading }) => {
    return (
        <div className="modal-backdrop">
            <div className="confirm-card">
                <div className="confirm-content">
                    <h2>{title || "Are you sure?"}</h2>
                    <p>{description || "This action cannot be undone."}</p>
                </div>

                <div className="confirm-actions">
                    <button
                        className="btn-cancel"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn-delete"
                        onClick={onConfirm}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirm;
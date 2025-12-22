import './DeleteConfirm.css';
import { deleteCollection } from '../../../state/features/collection/collectionThunks';
import { deleteSpace } from '../../../state/features/space/spaceThunks';
import { deleteLink } from '../../../state/features/link/linkThunks';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_COLLECTION, DELETE_LINK, DELETE_SPACE } from '../../../config';
import { selectIsLoading as spaceLoading } from "../../../state/features/space/spaceSelectors";
import { selectLinksLoading } from "../../../state/features/link/linkSelectors";
import { useState } from 'react';

const DeleteConfirm = ({ action, resourceToDelete, onClose }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const isSpaceLoading = useSelector(spaceLoading);
    const isLinkLoading = useSelector(selectLinksLoading);

    const resourceMap = {
        [DELETE_SPACE]: {
            title: `Delete "${resourceToDelete?.name}"?`,
            description: "This will permanently delete this space and all collections inside it.",
            onConfirm: () => deleteSpace(resourceToDelete._id),
            isLoading: isSpaceLoading
        },
        [DELETE_COLLECTION]: {
            title: `Delete "${resourceToDelete?.name}"?`,
            description: "This will permanently delete this collection and all the bookmarks inside it.",
            onConfirm: () => deleteCollection(resourceToDelete._id),
        },
        [DELETE_LINK]: {
            title: `Delete ${resourceToDelete.title} Bookmark?`,
            description: "Are you sure you want to remove this link? This cannot be undone.",
            onConfirm: () => deleteLink(resourceToDelete._id),
            isLoading: isLinkLoading
        }
    };

    const config = resourceMap[action] || {};
    const { title, description, onConfirm, isLoading } = config;


    const handleConfirm = async () => {
        setErrorMessage("");
        try {
            if (!onConfirm) return;
            const thunk = onConfirm();
            await dispatch(thunk).unwrap();
            onClose();
        } catch (error) {
            const msg = error?.message || error || "Failed to delete. Please try again.";
            setErrorMessage(msg);
        }
    };

    return (
        <div className="modal-backdrop" >
            <div className="confirm-card">
                {errorMessage && (
                    <div className="form-error-banner">
                        {errorMessage}
                    </div>
                )}
                <div className="confirm-content">
                    <h2>{title || "Are you sure?"}</h2>
                    <p>{description || "This action cannot be undone."}</p>
                </div>

                <div className="confirm-actions">
                    <button
                        className="btn-cancel"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn-delete"
                        onClick={handleConfirm}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default DeleteConfirm;
import "./ActionsBar.css";
import Form from "../Shared/Form/Form.jsx";
import { useSelector } from "react-redux";
import { selectCurrentSpace } from "../../state/features/space/spaceSelectors.js";
import { ADD_COLLECTION, ADD_LINK } from '../../config.js';
import { useFormManager } from "../../hooks/useFormManager.js";
import { useState } from "react";
import AlertModal from "../Shared/AlertModal/AlertModal.jsx";
import { selectCollections } from "../../state/features/collection/collectionSelectors.js";

function ActionsBar() {
  const selectedSpace = useSelector(selectCurrentSpace);
  const collections = useSelector(selectCollections);
  const [showAlert, setShowAlert] = useState(false);

  const { activeFormType, setActiveFormType, currentForm, handleSubmit, closeForm } =
    useFormManager({ spaceId: selectedSpace?._id });

  const handleAddLink = () => {
    if (!collections || collections.length === 0) {
      setShowAlert(true);
      return;
    }

    setActiveFormType(ADD_LINK);
  };

  return (
    <div>
      <AlertModal
        open={showAlert}
        title="Create a collection first"
        message="You need to create a collection before adding a link."
        onClose={() => setShowAlert(false)}
        actionLabel="Create Collection"
        onAction={() => {
          setShowAlert(false);
          setActiveFormType(ADD_COLLECTION);
        }}
      />

      {activeFormType && (
        <Form
          formInfo={currentForm.config}
          onSubmit={handleSubmit}
          hideForm={closeForm}
          isLoading={currentForm.loading}
        />
      )}

      <div className="adding-buttons">
        <div className="action" onClick={() => setActiveFormType(ADD_COLLECTION)}>+ Add Collection</div>
        <div className="action" onClick={() => handleAddLink()}>+ Add Link</div>
      </div>
    </div>
  );
}

export default ActionsBar;

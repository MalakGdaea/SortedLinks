import "./ActionsBar.css";
import Form from "../Shared/Form/Form.jsx";
import { useSelector } from "react-redux";
import { selectCurrentSpace } from "../../state/features/space/spaceSelectors.js";
import { ADD_COLLECTION, ADD_LINK } from '../../config.js';
import { useFormManager } from "../../hooks/useFormManager.js";

function ActionsBar() {
  const selectedSpace = useSelector(selectCurrentSpace);
  const { activeFormType, setActiveFormType, currentForm, handleSubmit, closeForm } =
    useFormManager({ spaceId: selectedSpace?._id });

  return (
    <div>
      <div className="adding-buttons">
        {activeFormType && (
          <Form
            formInfo={currentForm.config}
            onSubmit={handleSubmit}
            hideForm={() => closeForm()}
            isLoading={currentForm.loading}
          />)}
        <div className="action" onClick={() => setActiveFormType(ADD_COLLECTION)}>+ Add Collection</div>
        <div className="action" onClick={() => setActiveFormType(ADD_LINK)}>+ Add Link</div>
      </div>
    </div>
  );
}

export default ActionsBar;

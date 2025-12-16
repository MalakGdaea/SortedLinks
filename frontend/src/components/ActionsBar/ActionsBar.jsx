import "./ActionsBar.css";
import { useState } from "react";
import { ADD_Space, ADD_Collection } from "../../config";
import Form from "./Form";
function ActionsBar() {

  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");

  const showFormHandler = (type) => {
    setFormType(type);
    setShowForm(true);
  }

  return (
    <div>
      <div className="adding-buttons">
        {showForm && <Form formName={formType} hideForm={() => setShowForm(false)} />}
        <div className="action" onClick={() => showFormHandler(ADD_Collection)}>+ Add Collection</div>
        <div className="action" onClick={() => showFormHandler(ADD_Space)}>+ Add Link</div>
      </div>
    </div>
  );
}

export default ActionsBar;

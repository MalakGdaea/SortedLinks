import "./ActionsBar.css";
import { useState } from "react";
import { CollectionFormInfo, LinkFormInfo } from "../constants/formInfo.js";
import Form from "../Shared/Form/Form.jsx";
import ApiService from "../../services/ApiService.js";
import { useSelector } from "react-redux";
import { selectCurrentSpace } from "../../state/features/space/spaceSelectors.js";
import { createCollection } from "../../state/features/collection/collectionThunks.js";
import { useDispatch } from "react-redux";

function ActionsBar() {
  const [showForm, setShowForm] = useState(false);
  const [formInfo, setFormInfo] = useState("");
  const selectedTab = useSelector(selectCurrentSpace);
  const dispatch = useDispatch();

  const formHandler = (currentFormInfo) => {
    setFormInfo(currentFormInfo);
    setShowForm(true);
  }

  const handelSubmit = async (data) => {
    try {
      let response;
      if (formInfo === CollectionFormInfo) {
        dispatch(createCollection({ spaceId: selectedTab._id, collectionName: data.name }));
      } else if (formInfo === LinkFormInfo) {
        response = await ApiService.createLink(data);
      }
      setShowForm(false);
    } catch (error) {
      console.error("Error creating tab:", error);
    }
  };

  return (
    <div>
      <div className="adding-buttons">
        {showForm && <Form formInfo={formInfo} onSubmit={handelSubmit} hideForm={() => setShowForm(false)} />}
        <div className="action" onClick={() => formHandler(CollectionFormInfo)}>+ Add Collection</div>
        <div className="action" onClick={() => formHandler(LinkFormInfo)}>+ Add Link</div>
      </div>
    </div>
  );
}

export default ActionsBar;

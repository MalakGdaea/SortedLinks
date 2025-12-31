import "./Space.css"
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentSpace } from "../../state/features/space/spaceSelectors.js";
import { setCurrentSpace } from "../../state/features/space/spaceSlice.js";
import Dropdown from "../Shared/Dropdown/Dropdown.jsx";
import { DELETE_SPACE, EDIT_SPACE } from "../../config.js";
import { useFormManager } from "../../hooks/useFormManager.js";
import DeleteConfirm from "../Shared/DeleteConfirm/DeleteConfirm.jsx";
import Form from "../Shared/Form/Form.jsx";
import { editIcon, folderIcon, trashIcon } from "../../assets/index.js";

function Space({ space }) {
  const dispatch = useDispatch();
  const currentSpace = useSelector(selectCurrentSpace);
  const [isActive, setIsActive] = useState(currentSpace?._id === space._id);
  const { activeFormType, setActiveFormType, currentForm, handleSubmit, closeForm } =
    useFormManager({ space });

  useEffect(() => {
    setIsActive(currentSpace?._id === space._id);

  }, [currentSpace, space._id]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setCurrentSpace(space));
  };

  const menuOptions = [
    {
      label: 'Rename',
      icon: editIcon,
      onClick: () => setActiveFormType(EDIT_SPACE)
    },
    {
      label: 'Delete',
      icon: trashIcon,
      className: 'delete-option',
      onClick: () => setActiveFormType(DELETE_SPACE)
    }
  ];

  const renderModal = () => {
    if (!activeFormType) return null;

    if (activeFormType === DELETE_SPACE) {
      return (
        <DeleteConfirm
          action={DELETE_SPACE}
          resourceToDelete={space}
          onClose={() => setActiveFormType(null)} />
      );
    }

    return (
      <Form
        formInfo={currentForm.config}
        onSubmit={handleSubmit}
        hideForm={closeForm}
        isLoading={currentForm.loading}
      />
    );
  };


  return (
    <div onClick={handleClick}
      className={`space-container ${isActive ? "active" : ""}`} >
      <div className="space-name">
        {renderModal()}
        <img src={folderIcon} alt="Folder" />
        <div
          className='space'
        >
          {space.name}
        </div>
      </div>
      <div className="settings">
      </div>
      <Dropdown
        options={menuOptions}
      />
    </div>
  );
}

export default Space;

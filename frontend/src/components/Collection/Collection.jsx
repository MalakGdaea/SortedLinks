import "./Collection.css";
import Link from "../Link/Link";
import { useSelector } from "react-redux";
import { selectLinksByCollectionId } from "../../state/features/link/linkSelectors";
import Form from "../Shared/Form/Form";
import { useFormManager } from "../../hooks/useFormManager";
import { ADD_LINK, EDIT_COLLECTION, DELETE_COLLECTION, EDIT_LINK, DELETE_LINK } from "../../config";
import { useState } from "react";
import Dropdown from "../Shared/Dropdown/Dropdown";
import DeleteConfirm from "../Shared/DeleteConfirm/DeleteConfirm";
import { collapseArrowIcon, editIcon, expandArrowIcon, plusIcon, trashIcon } from "../../assets";

function Collection({ collection }) {
  const [collapse, setCollapse] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);


  const links = useSelector(state =>
    selectLinksByCollectionId(state, collection._id)
  );

  const { activeFormType, setActiveFormType, currentForm, handleSubmit, closeForm } =
    useFormManager({ collection, link: selectedLink });

  const handleLinkAction = (type, link) => {
    setSelectedLink(link);
    setActiveFormType(type);
  };

  const menuOptions = [
    {
      label: 'Rename',
      icon: editIcon,
      onClick: () => setActiveFormType(EDIT_COLLECTION)
    },
    {
      label: 'Delete',
      icon: trashIcon,
      className: 'delete-option',
      onClick: () => setActiveFormType(DELETE_COLLECTION)
    }
  ];

  const renderModal = () => {
    if (!activeFormType) return null;

    if (activeFormType === DELETE_COLLECTION || activeFormType === DELETE_LINK) {
      return (
        <DeleteConfirm
          action={activeFormType}
          resourceToDelete={activeFormType === DELETE_LINK ? selectedLink : collection}
          onClose={closeForm}
        />
      );
    }

    return (
      <Form
        formInfo={currentForm.config}
        onSubmit={handleSubmit}
        hideForm={closeForm}
        isLoading={currentForm.loading}
        initialValues={currentForm.initialValues}
      />
    );
  };

  return (
    <div className="collection-container">
      {renderModal()}
      <div className="collection-header">
        <h3 className="collection-title">{collection.name}</h3>
        <div className="collection-actions">
          <span className="col-action add" onClick={() => setActiveFormType(ADD_LINK)}><img src={plusIcon} alt="Add bookmark" /></span>
          <span className="col-action"><Dropdown options={menuOptions} /></span>
          <span className="collapse-icon col-action "
            onClick={() => setCollapse(!collapse)}>
            <img src={collapse ? collapseArrowIcon : expandArrowIcon} alt={collapse ? 'Collapse' : 'Expand'} /></span>
        </div>
      </div>{
        !collapse &&
        <div className="bookmarks-constinar">
          {links?.map((link) => (
            <Link key={link._id} link={link}
              onEdit={() => handleLinkAction(EDIT_LINK, link)}
              onDelete={() => handleLinkAction(DELETE_LINK, link)} />
          ))}
        </div>
      }
    </div>
  );
}

export default Collection;

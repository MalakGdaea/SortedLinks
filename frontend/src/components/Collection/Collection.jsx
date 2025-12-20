import "./Collection.css";
import Link from "../Link/Link";
import { useSelector } from "react-redux";
import { selectLinksByCollectionId } from "../../state/features/link/linkSelectors";
import Form from "../Shared/Form/Form";
import { useFormManager } from "../../hooks/useFormManager";
import { ADD_LINK, EDIT_COLLECTION, DELETE_COLLECTION } from "../../config";
import { useState } from "react";
import Dropdown from "../Shared/Dropdown/Dropdown";
import DeleteConfirm from "../Shared/DeleteConfirm/DeleteConfirm";
import { deleteCollection } from "../../state/features/collection/collectionThunks";
import { selectIsLoading } from "../../state/features/collection/collectionSelectors";
import { useDispatch } from "react-redux";

function Collection({ collection }) {
  const [collapse, setCollapse] = useState(false);
  const collectionLoader = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const links = useSelector(state =>
    selectLinksByCollectionId(state, collection._id)
  );

  const { activeFormType, setActiveFormType, currentForm, handleSubmit, closeForm } =
    useFormManager({ collection });

  const menuOptions = [
    {
      label: 'Rename',
      icon: 'edit.svg',
      onClick: () => setActiveFormType(EDIT_COLLECTION)
    },
    {
      label: 'Delete',
      icon: 'trash.svg',
      className: 'delete-option',
      onClick: () => setActiveFormType(DELETE_COLLECTION)
    }
  ];

  return (
    <div className="collection-container">
      {activeFormType && activeFormType !== DELETE_COLLECTION && (
        <Form
          formInfo={currentForm.config}
          onSubmit={handleSubmit}
          hideForm={() => closeForm()}
          isLoading={currentForm.loading}
        />
      )}

      {activeFormType === DELETE_COLLECTION && (
        <DeleteConfirm
          title={`Delete "${collection.name}"?`}
          description="This will permanently delete this collection and all the bookmarks inside it."
          onConfirm={() => dispatch(deleteCollection({ collectionId: collection?._id }))}
          onCancel={() => setActiveFormType(null)}
          isLoading={collectionLoader}
        />
      )}
      <div className="collection-header">
        <h3 className="collection-title">{collection.name}</h3>
        <div className="collection-actions">
          <span className="btn add" onClick={() => setActiveFormType(ADD_LINK)}><img src='plus.svg' /></span>
          <Dropdown
            trigger={<span className="btn settings"><img src='dots.png' alt="options" /></span>}
            options={menuOptions}
          />
          <span className="collapse-icon btn "
            onClick={() => setCollapse(!collapse)}>
            <img src={collapse ? "collapse-arrow.png" : "expand-arrow.png"} /></span>
        </div>
      </div>{
        !collapse &&
        <div className="bookmark-grid">
          {links?.map((link) => (
            <Link key={link._id} link={link} />
          ))}
        </div>
      }
    </div>
  );
}

export default Collection;

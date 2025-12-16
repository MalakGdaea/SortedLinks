import "./Category.css";
function OptionsList({ category, setEditedCategoryID, showBookmarkForm, deleteCategory, setIsOptionListShown }) {
  const handelAddBookmarkButton = () => {
    showBookmarkForm(true);
    setEditedCategoryID(category.categoryInfo._id);
    setIsOptionListShown(false);
  };
  return (
    <div>
      <div className="dropDawn">
        <div className="option" onClick={() => handelAddBookmarkButton()}>add bookmark</div>
        <div className="option" onClick={() => deleteCategory(category.categoryInfo._id)}>delete category</div>
      </div>
    </div>
  );
}
export default OptionsList;

import "./Category.css";
import Bookmark from "../Bookmarks/Bookmark";
function Category({ category }) {

  return (
    <div className="category-container">
      <div className="category-header">
        <h3 className="category-title">{category.categoryInfo.name}</h3>
        <div className="category-actions">
          <span className="edit-btn">Edit</span>
          <span className="collapse-icon"><img src="collapse-arrow.png" /></span>
        </div>
      </div>
      <div class="bookmark-grid">
        {category.bookmarks.map((bookmark) => (
          <Bookmark key={bookmark._id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}

export default Category;

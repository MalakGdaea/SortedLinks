import "./Category.css";
import Link from "../Link/Link";
import { useSelector } from "react-redux";
import { selectLinksByCollectionId } from "../../state/features/link/linkSelectors";

function Category({ category }) {
  const links = useSelector(state =>
    selectLinksByCollectionId(state, category._id)
  );

  console.log(links);

  return (
    <div className="category-container">
      <div className="category-header">
        <h3 className="category-title">{category.name}</h3>
        <div className="category-actions">
          <span className="edit-btn">+</span>
          <span className="edit-btn">Edit</span>
          <span className="collapse-icon"><img src="collapse-arrow.png" /></span>
        </div>
      </div>
      <div className="bookmark-grid">
        {links?.map((link) => (
          <Link key={link._id} link={link} />
        ))}
      </div>
    </div>
  );
}

export default Category;

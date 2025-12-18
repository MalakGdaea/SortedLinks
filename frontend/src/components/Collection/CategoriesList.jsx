import "./CategoriesList.css";
import Category from "./Category";
function CategoriesList({ categories }) {

  return (
    <div className="categories-list">
      {categories.map((category) => (
        <Category key={category._id} category={category} />
      ))}
    </div>
  );
}
export default CategoriesList;

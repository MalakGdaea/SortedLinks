import "./Content.css";
import { useEffect, useState } from "react";
import CategoriesList from "../Collection/CategoriesList";
import ApiService from "../../services/ApiService";
import ActionsBar from "../ActionsBar/ActionsBar";

function Content({ tab }) {
  const [categories, setCategories] = useState([]);
  const [searchedCategory, setSearchedCategory] = useState("");

  const updateSearchedCategory = (event) => {
    setSearchedCategory(event.target.value);
  };

  const fetchCategories = async () => {
    try {
      const data = await ApiService.getCategoriesByTab(tab._id);
      // Handle both direct array response and wrapped response
      const categoriesData = data.data || data;
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    }
  };

  useEffect(() => {
    if (tab) {
      fetchCategories();
    }
  }, [tab]);

  console.log(categories);


  let wantedCategories = Array.isArray(categories)
    ? categories.filter((category) =>
      category.categoryInfo?.name.toLowerCase().includes(searchedCategory.toLowerCase())
    )
    : [];

  return (
    <div className="main-content-container">
      <div className="search-container">
        <img src="search.svg" alt="Search Icon" className="search-icon" />
        <input className="category-input search-input" type="text" value={searchedCategory}
          placeholder="Find Category" onChange={updateSearchedCategory} />
      </div>
      <ActionsBar />
      <div className="path">{tab.name} <img src="greater-than.png" /> All Collections</div>
      <CategoriesList categories={wantedCategories}
        deleteCategory={(categoryID) => {
          ApiService.deleteCategory(categoryID).then(() => fetchCategories());
        }}
      />
    </div>
  );
}

export default Content;
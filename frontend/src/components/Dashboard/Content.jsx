import "./Content.css";
import { useState } from "react";
import CollectionList from "../Collection/CollectionList";
import ActionsBar from "../ActionsBar/ActionsBar";
import { useSelector } from 'react-redux';
import { selectCurrentSpace } from '../../state/features/space/spaceSelectors.js';
import { selectCollectionsByCurrentSpace } from "../../state/features/collection/collectionSelectors.js";

function Content() {
  const [searchedCategory, setSearchedCategory] = useState("");
  const selectedSpace = useSelector(selectCurrentSpace);
  const collections = useSelector(selectCollectionsByCurrentSpace);

  const updateSearchedCategory = (event) => {
    setSearchedCategory(event.target.value);
  };

  let wantedCategories = Array.isArray(collections)
    ? collections.filter((collection) =>
      collection.name.toLowerCase().includes(searchedCategory.toLowerCase())
    )
    : [];

  return (
    <div className="main-content-container">
      <div className="search-container">
        <img src="search.svg" alt="Search Icon" className="search-icon" />
        <input className="category-input search-input" type="text" value={searchedCategory}
          placeholder="Find Collection" onChange={updateSearchedCategory} />
      </div>
      <ActionsBar />
      <div className="path">{selectedSpace?.name} <img src="greater-than.png" /> All Collections</div>
      <CollectionList collections={wantedCategories} />
    </div>
  );
}

export default Content;
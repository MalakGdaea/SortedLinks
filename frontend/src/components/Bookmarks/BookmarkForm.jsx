import { useState } from "react";
import "./BookmarkForm.css";
function BookmarkForm({ categoryID, addBookmark, hideBookmarkForm }) {
  const [bookmarkInfo, setBookmarkInfo] = useState({ title: "", URL: "", category: categoryID, tags: [], note: "" });
  const handleChange = (event) => {
    setBookmarkInfo({ ...bookmarkInfo, [event.target.name]: event.target.value });
  };
  const handleAddButton = () => {
    addBookmark(bookmarkInfo);
    hideBookmarkForm(false);
  };
  return (
    <div className="form-container">
      <div className="bookmark-form">
        <h4>Add Bookmark</h4>
        <hr />
        <form className="input-fields">
          <span className="input-label">Title:</span>
          <input name="title" type="text" className="input" onChange={handleChange}></input>
          <span className="input-label">URL:</span>
          <input name="URL" type="text" className="input" onChange={handleChange}></input>
          <span className="input-label">Tags:</span>
          <textarea name="tags" type="text" onChange={handleChange} placeholder="separate tags by commas"></textarea>
          <span className="input-label">Notes:</span>
          <textarea name="note" type="text" onChange={handleChange}></textarea>
        </form>
        <div className="options-button">
          <button onClick={() => handleAddButton()}>Add</button>
          <button onClick={() => hideBookmarkForm(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
export default BookmarkForm;

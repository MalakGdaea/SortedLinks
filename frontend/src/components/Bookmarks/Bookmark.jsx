import "./Bookmark.css";
import { getIcon } from "../../config";
function Bookmark({ bookmark }) {
  return (
    <div className="bookmark-card">
      <a className="bookmark" href={bookmark.URL} target="_blank" rel="noopener noreferrer">
        <img className="site-icon"
          src={getIcon(bookmark.URL)} alt={bookmark.title} />
        <div className="bookmark-name"> {bookmark.title}</div>
      </a>
    </div>
  );
}
export default Bookmark;

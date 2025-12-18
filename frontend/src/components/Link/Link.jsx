import "./Link.css";
import { getIcon } from "../../config";

function Link({ link }) {

  return (
    <div className="link-card">
      <a className="link" href={link.URL} target="_blank" rel="noopener noreferrer">
        <img className="site-icon"
          src={getIcon(link.URL)} alt={link.title} />
        <div className="link-name"> {link.title}</div>
      </a>
    </div>
  );
}
export default Link;

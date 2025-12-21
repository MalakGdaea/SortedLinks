import "./Link.css";
import { getIcon } from "../../config";
import Dropdown from "../Shared/Dropdown/Dropdown";

function Link({ link, onEdit, onDelete }) {
  const menuOptions = [
    {
      label: 'Edit',
      icon: 'edit.svg',
      onClick: onEdit
    },
    {
      label: 'Delete',
      icon: 'trash.svg',
      className: 'delete-option',
      onClick: onDelete
    }
  ];

  return (
    <div className="link-card">
      <a className="link" href={link.URL} target="_blank" rel="noopener noreferrer">
        <img className="site-icon"
          src={getIcon(link.URL)} alt={link.title} />
        <div className="link-name"> {link.title}</div>
      </a>
      <div className="link-settings"><Dropdown options={menuOptions} /></div>
    </div>
  );
}
export default Link;

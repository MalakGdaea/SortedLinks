import "./Link.css";
import { getIcon } from "../../config";
import Dropdown from "../Shared/Dropdown/Dropdown";
import { editIcon, trashIcon } from "../../assets";

function Link({ link, onEdit, onDelete }) {
  const menuOptions = [
    {
      label: 'Edit',
      icon: editIcon,
      onClick: onEdit
    },
    {
      label: 'Delete',
      icon: trashIcon,
      className: 'delete-option',
      onClick: onDelete
    }
  ];

  return (
    <div className="link-card">
      <a className="link" href={link.URL} target="_blank" rel="noopener noreferrer">
        <div className="link-header">
          <img className="site-icon"
            src={getIcon(link.URL)} alt={link.title} />
          <div className="link-name"> {link.title}</div>
        </div>
        {link.note && <p className="link-description">{link.note}</p>}
      </a>
      <div className="link-settings"><Dropdown options={menuOptions} /></div>
    </div>
  );
}
export default Link;

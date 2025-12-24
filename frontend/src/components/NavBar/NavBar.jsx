import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function NavBar({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="nav-bar">
      <img src="menu.png" className="nav-icon" onClick={onMenuClick} />
      <img src="logo1.png" alt="Logo" className="nav-icon logo" />
      <div className="nav-right">
        {user && (
          <>
            <span className="user-info">Welcome, {user.name || user.email}</span>
            <img src="logout.png" className="nav-icon" onClick={handleLogout} />
          </>
        )}
      </div>
    </div>
  );
}
export default NavBar;

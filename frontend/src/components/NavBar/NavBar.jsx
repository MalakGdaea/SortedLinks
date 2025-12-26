import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { logoutIcon } from "../../assets";

function NavBar({ onMenuClick, isSidebarOpen }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="nav-bar">
      <div class={isSidebarOpen ? `menu-toggle active` : 'menu-toggle'} id="menu" onClick={onMenuClick} >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <img src="logo.png" alt="Logo" className="nav-icon logo" />
      <div className="nav-right">
        {user && (
          <>
            <span className="user-info">Welcome, {user.name || user.email}</span>
            <img src={logoutIcon} className="nav-icon" onClick={handleLogout} />
          </>
        )}
      </div>
    </div>
  );
}
export default NavBar;

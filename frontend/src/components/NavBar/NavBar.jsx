import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../state/features/auth/authSelectors";
import { logout } from "../../state/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { logoutIcon, profileIcon } from "../../assets";
import { useState } from "react";

function NavBar({ onMenuClick, isSidebarOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [isListOpen, setIsListOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };



  return (
    <div className="nav-bar">
      <div className={`menu-toggle ${isSidebarOpen ? 'active' : ''}`}
        onClick={onMenuClick} >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="nav-right">
        {user && (
          <>
            <div className="user-settings" onClick={() => setIsListOpen(!isListOpen)}>{user.name && user.name[0]}</div>

            {/* Dropdown */}
            {isListOpen && (
              <div className="dropdown">
                <div className="user-info">
                  <div className="user-settings">{user.name && user.name[0]}</div>
                  <div>
                    <div className="name">{user.name}</div>
                    <div className="email">{user.email}</div>
                  </div>
                </div>

                <div className="divider" />

                <button className="dropdown-item">
                  <img src={profileIcon} alt="profile" />
                  <span>Profile</span>
                </button>

                <div className="divider" />

                <button
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  <img src={logoutIcon} alt="logg out" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default NavBar;

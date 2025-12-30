import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { logoutIcon } from "../../assets";
import { useSelector } from "react-redux";
import { userSelector } from "../../state/features/auth/authSelectors";
import { logout } from "../../state/features/auth/authSlice";
import { useDispatch } from "react-redux";

function NavBar({ onMenuClick, isSidebarOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="nav-bar">
      <div className={isSidebarOpen ? `menu-toggle active` : 'menu-toggle'} id="menu" onClick={onMenuClick} >
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

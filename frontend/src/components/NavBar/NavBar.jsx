import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="nav-bar">
      <div className="nav-left">
        <img src="logo1.png" alt="Logo" className="nav-logo" />
        <div className="nav-item"><Link to="/dashboard">SortedLinkes Dashboard</Link></div>
      </div>
      <div className="nav-right">
        {user && (
          <>
            <span className="user-info">Welcome, {user.name || user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
export default NavBar;

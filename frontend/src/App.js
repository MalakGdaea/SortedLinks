import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./state/features/auth/authThunks";
import { logout } from "./state/features/auth/authSlice";
import ApiService from "./services/ApiService";
import Profile from "./pages/Profile/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = ApiService.getToken();
      if (accessToken) {
        dispatch(initializeAuth())
      } else {
        dispatch(logout());
      }
    };
    checkToken();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated, isLoading } from '../state/features/auth/authSelectors';

const ProtectedRoute = ({ children }) => {

    const isUserAuthenticated = useSelector(isAuthenticated);
    const loading = useSelector(isLoading);


    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
    }

    if (!isUserAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

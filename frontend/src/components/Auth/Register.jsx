import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Auth.css';

const Register = ({ showCard = true, onSuccess = null, onRegistrationComplete = null }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (!email || !password || !name) {
                throw new Error('Email, name, and password are required');
            }
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }
            await register(email, password, name);
            setSuccess('Registration successful! You can now log in.');
            // Reset form
            setEmail('');
            setPassword('');
            setName('');
            setConfirmPassword('');
            // Call callback if provided (for Landing page to switch to login tab)
            if (onRegistrationComplete) {
                setTimeout(onRegistrationComplete, 1500);
            } else if (onSuccess) {
                onSuccess();
            } else {
                // Standalone mode - redirect to login
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const formContent = (
        <>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                    />
                </div>
                <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </>
    );

    if (showCard) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Register</h2>
                    {formContent}
                </div>
            </div>
        );
    }

    return <div className="auth-card">{formContent}</div>;
};

export default Register;

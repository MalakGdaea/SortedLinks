import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import './Landing.css';

const LandingPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');
    const modalRef = useRef(null);

    // If user is already authenticated, redirect to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the modal is open AND if the click target is OUTSIDE the modal content
            if (activeTab && modalRef.current && !modalRef.current.contains(event.target)) {
                setActiveTab('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeTab]);

    return (
        <div className="landing-page">
            <img className='background-image' src='landing-bg.png' />
            <nav>
                <img className='logo' src='logo1.png' />
                <button className='login-btn' onClick={() => setActiveTab('login')}>Login</button>
            </nav>
            <div className="landing-hero">
                <div className="hero-content">
                    <img className='mail-logo' src='logo.png' />
                    <p>Organize and manage your bookmarks with ease</p>
                    <button onClick={() => setActiveTab('register')}>Register</button>
                </div>
            </div>
            {activeTab !== '' && <div className='backdrop-overlay'></div>}
            <div className="landing-container" ref={modalRef}>
                <div className="auth-content">
                    {activeTab === 'login' && <Login showCard={false} />}
                    {activeTab === 'register' && <Register
                        showCard={false}
                        onRegistrationComplete={() => setActiveTab('login')}
                    />}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import './Landing.css';
import { useOutsideClick } from "../hooks/useOutsideClick";
import { archiveIcon, briefcaseIcon, focusIcon, internetIcon, layersIcon, lightbulbIcon, windIcon } from '../assets';
import { useSelector } from 'react-redux';
import { isAuthenticated as isAuthenticatedSelector } from '../state/features/auth/authSelectors';

const LandingPage = () => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');
    const modalRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVideoName, setCurrentVideoName] = useState(null);

    useOutsideClick(modalRef, () => setActiveTab(''));

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, []);

    const handlePlay = () => {
        if (!videoRef.current) return;
        setIsPlaying(true);
    };

    const handleStepClick = (videoName) => {
        setCurrentVideoName(videoName);
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.load();
        }
    };

    return (
        <div className="landing-page">
            <nav>
                <div className='logo'>
                    <img src='logo.png' alt='Logo' />
                    <span>SortedLinks</span>
                </div>
                <div className='login-cont'>
                    <a href='#use-cases'>Use cases</a>
                    <div className='login' onClick={() => setActiveTab('login')}>Login</div>
                </div>
            </nav>
            <div className='banner'>
                <picture>
                    <source srcSet="banner-sm.webp" media="(max-width: 480px)" type="image/webp" />
                    <source srcSet="banner-sm.png" media="(max-width: 480px)" type="image/png" />
                    <source srcSet="banner.webp" type="image/webp" />
                    <img src="banner.png" alt="Organize your links" className='banner-bg' />
                </picture>
                <div className='banner-content'>
                    <h3>Organize your links.<br />
                        Rediscover your knowledge.</h3>
                    <p>Save, organize, and manage your bookmarks using spaces and collections.
                        Access everything instantly</p>
                    <button
                        className='signup btn'
                        onClick={() => setActiveTab('register')}>Get started — it’s free</button>
                    <a href='#instructions' className='btn demo'>Watch Demo Video</a>
                </div>
            </div>
            <div className='benefits'>
                <div>
                    <img src={layersIcon} alt='Smart Organization' />
                    <span>Smart Organization</span>
                </div>
                <div>
                    <img src={internetIcon} alt='Instant access' />
                    <span>Instant Access</span>
                </div>
                <div>
                    <img src={focusIcon} alt='stay focused' />
                    <span>Stay Focused</span>
                </div>
            </div>

            <section className="instructions" id='instructions'>
                <h3>Organize your links in 3 simple steps</h3>
                <p className="instructions-hint">
                    Click a step to see how it works
                </p>

                <div className="instructions-content">
                    {/* Steps */}
                    <div className="steps">
                        <button className={`step ${currentVideoName === "create-space" ? "active" : ""}`}
                            onClick={() => handleStepClick("create-space")}>
                            <span className="step-number">1</span>
                            <div>
                                <h4>Create a Space</h4>
                                <p>Set up your main workspace</p>
                            </div>
                        </button>

                        <button className={`step ${currentVideoName === "create-collection" ? "active" : ""}`}
                            onClick={() => handleStepClick("create-collection")}>
                            <span className="step-number">2</span>
                            <div>
                                <h4>Add Collections</h4>
                                <p>Group links by topic</p>
                            </div>
                        </button>

                        <button className={`step ${currentVideoName === "save-link" ? "active" : ""}`}
                            onClick={() => handleStepClick("save-link")}>
                            <span className="step-number">3</span>
                            <div>
                                <h4>Save & Rediscover</h4>
                                <p>Find links instantly</p>
                            </div>
                        </button>
                    </div>

                    <div className="video-preview" onClick={handlePlay}>
                        {!currentVideoName && (
                            <div className="video-overlay">
                                <span className="play-icon">▶</span>
                            </div>
                        )}

                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            preload="auto"
                            controls={isPlaying}
                        >
                            <source src={`/videos/${currentVideoName}.mp4`} type="video/mp4" />
                        </video>
                    </div>

                </div>
            </section>
            <section id="use-cases">
                <h3>Why You’ll Love Organizing Your Links</h3>
                <div className="use-cases-grid">
                    <div className="use-case">
                        <img src={archiveIcon} alt='Save Articles to Read Later' />
                        <h4>Save Articles to Read Later</h4>
                        <p>Found an interesting article but don’t have time now? Save it and come back when you’re ready.</p>
                    </div>
                    <div className="use-case">
                        <img src={briefcaseIcon} alt='Keep Bookmarks Handy' />
                        <h4>Keep Project Resources Handy</h4>
                        <p>Collect useful websites, tutorials, or tools in one place while working on a project.</p>
                    </div>
                    <div className="use-case" >
                        <img src={lightbulbIcon} alt='Organize Ideas and Inspiration' />
                        <h4>Organize Ideas and Inspiration</h4>
                        <p>Save links to ideas, videos, or references you want to revisit later.</p>
                    </div>
                    <div className="use-case">
                        <img src={windIcon} alt='Quick access the bookmarks' />
                        <h4>Quick Access When You Need It</h4>
                        <p>No more digging through browser history—everything you need is right at your fingertips.</p>
                    </div>
                </div>
            </section>

            <section id="action">
                <h3>Transform Your Digital Clutter Today</h3>
                <p>Save, organize, and access all your important links effortlessly—take control of your online world now.</p>
                <button className='btn signup'
                    onClick={() => setActiveTab('register')}>Get Started — it’s free</button>
            </section>
            <footer className="landing-footer">
                <p>© {new Date().getFullYear()} SortedLinks. All rights reserved.</p>
            </footer>


            {activeTab !== '' && <div className='backdrop-overlay'></div>}
            <div className="auth-container" ref={modalRef}>
                {activeTab === 'login' && <Login showCard={false} />}
                {activeTab === 'register' && <Register
                    showCard={false}
                    onRegistrationComplete={() => setActiveTab('login')}
                />}
            </div>
        </div>
    );
};

export default LandingPage;

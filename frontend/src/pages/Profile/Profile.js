import "./Profile.css";
import { userSelector } from "../../state/features/auth/authSelectors";
import { useSelector } from "react-redux";
import { cameraIcon, downloadIcon, lockIcon, trashIcon } from "../../assets";
import { selectSpacesCount } from "../../state/features/space/spaceSelectors";
import { selectCollectionCount } from "../../state/features/collection/collectionSelectors";
import { selectLinksCount } from "../../state/features/link/linkSelectors";

const Profile = () => {
    const user = useSelector(userSelector);
    const spacesCount = useSelector(selectSpacesCount);
    const collectionCount = useSelector(selectCollectionCount);
    const linksCount = useSelector(selectLinksCount);


    return (
        <div className="profile-container">
            <h1>Profile</h1>

            {/* PROFILE HEADER CARD */}
            <header className="profile-card">
                <div className="profile-left">
                    <div className="user-image">
                        {user?.name?.[0]?.toUpperCase()}
                        <span className="camera-badge"><img src={cameraIcon} /></span>
                    </div>

                    <div className="user-details">
                        <div className="name">{user.name}</div>
                        <div className="email">{user.email}</div>
                    </div>
                </div>

                <button className="edit-btn">Edit</button>

                <div className="data-info">
                    <div className="stat">
                        <span className="number">{spacesCount}</span>
                        <span className="label">Spaces</span>
                    </div>
                    <div className="divider" />
                    <div className="stat">
                        <span className="number">{collectionCount}</span>
                        <span className="label">Collections</span>
                    </div>
                    <div className="divider" />
                    <div className="stat">
                        <span className="number">{linksCount}</span>
                        <span className="label">Links</span>
                    </div>
                </div>
            </header>

            {/* ACCOUNT SETTINGS */}
            <section className="section">
                <h2>Account Settings</h2>

                <div className="action-card">
                    <div className="icon blue"><img src={lockIcon} alt="change password" /></div>
                    <div className="action-text">
                        <div className="title">Change Password</div>
                        <div className="subtitle">Update your password</div>
                    </div>
                    <span className="arrow">›</span>
                </div>

                <div className="action-card">
                    <div className="icon blue"><img src={downloadIcon} alt="download links" /></div>
                    <div className="action-text">
                        <div className="title">Export Data</div>
                        <div className="subtitle">
                            Download your spaces, collections, and links
                        </div>
                    </div>
                    <span className="arrow">›</span>
                </div>
            </section>

            {/* DANGER ZONE */}
            <section className="section">
                <h2 className="danger-title">Danger Zone</h2>

                <div className="action-card danger">
                    <div className="icon red"><img src={trashIcon} alt="delete account" /></div>
                    <div className="action-text">
                        <div className="title">Delete Account</div>
                        <div className="subtitle">
                            Permanently delete your account
                        </div>
                    </div>
                    <span className="arrow">›</span>
                </div>
            </section>
        </div>
    );
};

export default Profile;

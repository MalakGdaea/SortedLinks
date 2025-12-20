// Dropdown.js
import React, { useState } from 'react';
import './Dropdown.css'; // You can move dropdown styles to a shared CSS file later

const Dropdown = ({ trigger, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="menu-wrapper">
            {/* The clickable area that opens the menu */}
            <div onClick={() => setIsOpen(!isOpen)} className="dropdown-trigger">
                {trigger}
            </div>

            {isOpen && (
                <>
                    {/* Backdrop to close menu when clicking outside */}
                    <div className="menu-backdrop" onClick={() => setIsOpen(false)} />

                    <ul className="options-list">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={option.className || ''}
                                onClick={() => {
                                    option.onClick();
                                    setIsOpen(false);
                                }}
                            >
                                {option.icon && <img src={option.icon} className="menu-icon" alt="" />}
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Dropdown;
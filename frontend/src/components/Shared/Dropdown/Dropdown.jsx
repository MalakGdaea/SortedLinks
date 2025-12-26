import { useState, useRef } from 'react';
import './Dropdown.css';
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { dotsIcon } from '../../../assets';

const Dropdown = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => {
        if (isOpen) {
            setIsOpen(false);
        };
    });

    return (
        <div className="menu-wrapper" ref={dropdownRef} onMouseEnter={(e) => e.stopPropagation()}>
            <div onClick={() => setIsOpen(!isOpen)} className="dropdown-trigger">
                <span className="settings"><img src={dotsIcon} alt="options" /></span>
            </div>
            {
                isOpen && (
                    <>
                        <div className="menu-backdrop" onClick={() => setIsOpen(false)} />

                        <ul className="options-list" onMouseEnter={(e) => e.stopPropagation()}>
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
                )

            }
        </div>
    );
};

export default Dropdown;
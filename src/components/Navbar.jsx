import React from 'react';
import "../App.css";
import '../styles/global.css';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Profiles</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
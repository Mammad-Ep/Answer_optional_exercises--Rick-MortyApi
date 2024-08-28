import React from 'react';
import styled1 from "../css/style1.module.css";
import { Link } from 'react-router-dom';
// ___________________________________________________________

const Navbar = () => {
    return (
        <>
            <nav className={styled1['navbar']}>
                <ul className={styled1['navbar-nav']}>
                    <li className={styled1['nav-item']}><Link to="/" className={styled1['nav-link']}>Home</Link></li>
                    <li className={styled1['nav-item']}><Link to="/cart/" className={styled1['nav-link']}>Cart</Link></li>
                    <li className={styled1['nav-item']}><Link to="/photo-gallery/" className={styled1['nav-link']}>Photo Gallery</Link></li>
                    <li className={styled1['nav-item']}><Link to="/ReactQuiz/" className={styled1['nav-link']}>React Quiz</Link></li>
                    <li className={styled1['nav-item']}><Link to="/rick&morty-list/" className={styled1['nav-link']}>rick&morty-list</Link></li>
                    <li className={styled1['nav-item']}><Link to="/about-us/" className={styled1['nav-link']}>About</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
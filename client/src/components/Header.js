import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/logo.png"

const Header = () => (
    <header>
        <div className="navigation">
            <div className="navigation-container wrapper">
                <Link to="/" className="navigation__logo"><img src={logo} className="navigation__logo__img" alt="logo" /></Link>
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <NavLink activeClassName="navigation__link--active" className="navigation__link" exact={true} to="/">
                            Home
                </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink activeClassName="navigation__link--active" className="navigation__link" exact={true} to="/wishlist">
                            Wishlist
                    </NavLink>
                    </li>
                    <li className="navigation__item">
                        <button className="navigation__link">
                            Logout
                    </button>
                    </li>
                </ul>
            </div>
        </div>
    </header>
);

export default Header;

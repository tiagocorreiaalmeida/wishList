import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../images/logo.png";
import { startLogout } from "../actions/auth";

class Header extends React.Component {
    onClick = () => this.props.dispatch(startLogout());
    render() {
        return (
            <header>
                <div className="navigation">
                    <div className="navigation-container wrapper">
                        <Link to="/dashboard" className="navigation__logo">
                            <img
                                src={logo}
                                className="navigation__logo__img"
                                alt="logo"
                            />
                        </Link>
                        <ul className="navigation__list">
                            <li className="navigation__item">
                                <NavLink
                                    activeClassName="navigation__link--active"
                                    className="navigation__link"
                                    exact={true}
                                    to="/dashboard"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="navigation__item">
                                <NavLink
                                    activeClassName="navigation__link--active"
                                    className="navigation__link"
                                    exact={true}
                                    to="/wishlist"
                                >
                                    Wishlist
                                </NavLink>
                            </li>
                            <li className="navigation__item">
                                <button
                                    className="navigation__link"
                                    onClick={this.onClick}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default connect()(Header);

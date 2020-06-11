import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark mb-lg-auto">
                <Link to="/" className="navbar-brand" style={{fontSize : "28px"}}>
                    Manegizer
                </Link>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/db">
                            Project List
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;
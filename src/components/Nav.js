import React, {Component} from 'react';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark mb-lg-auto">
                <a className="navbar-brand" style={{fontSize : "28px"}} href="/db">
                    Manegizer
                </a>
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
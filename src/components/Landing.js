import React , {Component} from "react";
import {Link} from "react-router-dom";

class Landing extends Component {

    render() {
        return (
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">
                                    Manegizer
                                </h1>
                                <p className="lead">
                                    Write something here so it gets more sound
                                </p>
                                <hr />
                                <Link className="btn btn-lg btn-primary mr-2" to="/db">
                                    View Projects
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;

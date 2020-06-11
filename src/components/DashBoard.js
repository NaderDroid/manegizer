import React, { Component } from "react";
import ProjectItem from "./ProjectItem";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";
import CreateProject from "./CreateProject";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getProjects();
    }

    render() {
        const { projects } = this.props.project;

        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="text-lg-center text-center">Projects List</h1>
                            <br />
                            <CreateProject />

                            <br />
                            <hr />
                            {projects.map(project => (
                                <div>
                                    <ProjectItem key={project.id} project={project} />
                                    <br />
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    project: state.project
});

export default connect(
    mapStateToProps,
    { getProjects }
)(Dashboard);

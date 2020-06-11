import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteProject} from "../actions/projectActions";

class ProjectItem extends Component {
    onDeleteClick = id => {
        this.props.deleteProject(id);
    };

    render() {
        const {project} = this.props;
        let deadline = this.props.project.end_date != null ? this.props.project.end_date : "Not Provided"
        let updated = this.props.project.updated_At != null ? this.props.project.end_date : "Never updated"
        return (
            <div className="container" style={{width : "1030px"}}>
                <div className="card">
                    <div className="card-header">
                        Project ID: {project.projectIdentifier}
                            <h6 className="float-right text-light bg-dark m-1 ">
                                Deadline: {deadline}
                            </h6>
                    </div>
                    <div className=" card-body bg-light mb-3">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card-title">
                                    <h5><h4 className="d-inline" style={{color : "#3c72cb"}}>Project Name:</h4> {project.projectName}</h5>
                                </div>
                                <p><p className="d-inline" style={{color : "#3c72cb"}}>Description:</p> {project.description}</p>
                            </div>
                        <div className="col-md-3 d-inline d-lg-block ml-auto">
                            <ul className="list-group">
                                <Link to={`/pb/${project.projectIdentifier}`}
                                      style={{ textDecoration: 'none' }}
                                >
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered"> View Project Tasks </i>
                                    </li>
                                </Link>
                                <Link to={`/updateProject/${project.projectIdentifier}`}
                                      style={{ textDecoration: 'none' }}
                                >
                                    <li className="list-group-item btn btn-block">
                                        <i className="fa fa-edit">Update Project</i>
                                    </li>
                                </Link>

                                <li
                                    className="list-group-item btn btn-block delete"
                                    onClick={this.onDeleteClick.bind(
                                        this,
                                        project.projectIdentifier
                                    )}
                                >
                                    <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                        <div className="card-footer">
                            <p className="card-text">
                                <small className="text-muted">Last update: {updated}</small></p>
                        </div>
                </div>
                </div>
            </div>
        );
    }
}

ProjectItem.propTypes = {
    deleteProject: PropTypes.func.isRequired
};

export default connect(
    null,
    {deleteProject}
)(ProjectItem);

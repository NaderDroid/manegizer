import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../actions/backlogActions";

class ProjectBoard extends Component {
    //constructor to handle errors
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps , dataFormatValue) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { id } = this.props.match.params;
        const { project_tasks } = this.props.backlog;
        const { errors } = this.state;

        let BoardContent;

        const boardAlgorithm = (errors, project_tasks) => {
            if (project_tasks.length < 1) {
                if (errors.projectNotFound) {
                    return (
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.projectNotFound}
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <div className="alert alert-info text-center" role="alert">
                                {//Todo: change message here to include link in the message
                                }
                                You haven't created any task on this project
                                <br/>
                            </div>
                            <Link to={`/addTask/${id}`} className="btn text-lg-center btn-block bg-light">
                                Add Task
                            </Link>
                        </div>
                    );
                }
            } else {
                return <Backlog project_tasks_prop={project_tasks} />;
            }
        };

        BoardContent = boardAlgorithm(errors, project_tasks);

        return (
            <div className="container">
                <Link to={`/addTask/${id}`} className="btn btn-primary"style={{marginTop:"12px"}}>
                    <i className="fa fa-plus-circle" > Add New Task </i>
                </Link>
                <br />
                <hr />
                {BoardContent}
            </div>
        );
    }
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getBacklog }
)(ProjectBoard);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import { deleteProjectTask } from "../actions/backlogActions";


class Task extends Component {
    onDeleteClick(backlog_id, pt_id) {
        this.props.deleteProjectTask(backlog_id, pt_id);
    }
    render() {
        const { project_task } = this.props;
        let priorityString;
        let priorityClass;

        if (project_task.priority === 1) {
            priorityClass = "bg-light text-danger";
            priorityString = "HIGH";
        }

        if (project_task.priority === 2) {
            priorityClass = "bg-light text-warning";
            priorityString = "MEDIUM";
        }

        if (project_task.priority === 3) {
            priorityClass = "bg-light text-info";
            priorityString = "LOW";
        }

        let deadline = project_task.dueDate != null ? project_task.dueDate : "Not Provided"
        return (
            <div className="card mb-3">
                <div className={`card-header text-primary ${priorityClass}`}>
                    <h6 className="font-weight-bold">
                        TID: {project_task.projectSequence}
                        <h6 className="d-inline float-right font-weight-bold">Priority: {priorityString}</h6>
                    </h6>
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{project_task.summary}</h5>
                    <p className="card-text text-truncate ">
                        {project_task.acceptanceCriteria}
                    </p>
                    <Link
                        to={`/updateTask/${project_task.projectIdentifier}/${
                            project_task.projectSequence
                        }`}
                        className="btn btn-secondary"
                    >
                        View / Update
                    </Link>

                    <button
                        className="btn btn-danger ml-4"
                        onClick={this.onDeleteClick.bind(
                            this,
                            project_task.projectIdentifier,
                            project_task.projectSequence
                        )}
                    >
                        Delete
                    </button>
                </div>
                <div className="card-footer bg-light text-black-50">
                    <h6 style={{fontSize : "14px"}}>Due on: {deadline} </h6>
                </div>
            </div>
        );
    }
}

Task.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
};
export default connect(
    null,
    { deleteProjectTask }
)(Task);

import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getProjectTask, updateProjectTask } from "../actions/backlogActions";
import PropTypes from "prop-types";

class UpdateTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            projectSequence: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: "",
            dueDate: "",
            projectIdentifier: "",
            create_At: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { backlog_id, pt_id } = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_id, this.props.history);
    }

    componentWillReceiveProps(nextProps , faceDetectionRequest) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        const {
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            create_At
        } = nextProps.project_task;

        this.setState({
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            create_At
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const UpdateProjectTask = {
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier,
            create_At: this.state.create_At
        };

        // console.log(UpdateProjectTask);
        this.props.updateProjectTask(
            this.state.projectIdentifier,
            this.state.projectSequence,
            UpdateProjectTask,
            this.props.history
        );
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="add-PBI">
                <div className="container m-5">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link
                                to={`/pb/${this.state.projectIdentifier}`}
                                className="btn btn-light"
                            >
                                Back to Projects
                            </Link>
                            <h4 className="display-4 text-center">Update Task</h4>
                            <p className="lead text-center">
                                PID: {this.state.projectIdentifier} | TID:{" "}
                                {this.state.projectSequence}{" "}
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <h5 className="lbl">Project Name</h5>
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-md", {
                                            "is-invalid": errors.summary
                                        })}
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <h5 className="lbl">DoD</h5>
                  <textarea
                      className="form-control form-control-md"
                      placeholder="Acceptance Criteria"
                      name="acceptanceCriteria"
                      value={this.state.acceptanceCriteria}
                      onChange={this.onChange}
                  />
                                </div>
                                <h5 className="lbl">Due Date</h5>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-md"
                                        name="dueDate"
                                        value={this.state.dueDate}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <h5 className="lbl">Priority</h5>
                                    <select
                                        className="form-control form-control-md"
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.onChange}
                                    >
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <h5 className="lbl">Status</h5>
                                    <select
                                        className="form-control form-control-md"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-dark btn-block mt-4"
                                    value="Update Task"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getProjectTask, updateProjectTask }
)(UpdateTask);

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addProjectTask} from "../actions/backlogActions";
import classnames from 'classnames'

class AddTask extends Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;

        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: id,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps , dataFormatValue) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    // on change
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    //on submit
    onSubmit(e) {
        e.preventDefault();

        const newTask = {
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate
        };
        this.props.addProjectTask(
            this.state.projectIdentifier,
            newTask,
            this.props.history
        );
    }

    render() {
        const { id } = this.props.match.params;
        const { errors } = this.state;
        return (
            <div className="add-PBI">
                <div className="container m-5">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/pb/${id}`} className="btn btn-light">
                                Back to Project
                            </Link>
                            <h4 className="display-4 text-center">New Task</h4>
                            <h6 className="text-info text-center">To project: ({id})</h6>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <h5 className="lbl">Task Summary</h5>
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-md", {
                                            "is-invalid": errors.summary
                                        })}
                                        name="summary"
                                        placeholder="Task summary"
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <h5 className="lbl">Definition of Done - DoD</h5>
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
                                    <h5 className="lbl">Select Priority</h5>
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
                                    <div className="text-info small">If not selected, will default to Low</div>

                                </div>

                                <div className="form-group">
                                    <h5 className="lbl">Current Status</h5>
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
                                    <div className="text-info small">If not selected, will default to To Do</div>

                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-dark btn-block mt-4"
                                    value="Add Task"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addProjectTask })(AddTask);
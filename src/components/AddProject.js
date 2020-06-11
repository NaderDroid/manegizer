import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { createProject} from "../actions/projectActions";
import classname from 'classnames'

class AddProject extends Component {

    state={
        projectName: "",
        projectIdentifier: "",
        description: "",
        start_date : "",
        end_date : "",
        errors : {}
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors){
            this.setState({
                errors : nextProps.errors
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date : this.state.start_date,
            end_date : this.state.end_date
        }
        this.props.createProject(newProject , this.props.history)
}
    render() {

        const { errors } = this.state;
        return (

            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center p-3">Create Project</h5>
                            <hr/>
                            <form className="form-control-lg" onSubmit={this.submitForm}>
                                <div className="form-group">
                                    <h5>Project Name</h5>
                                    <input type="text"
                                           className={ classname("form-control form-control-lg"
                                           , {"is-invalid" : errors.projectName})}
                                           placeholder="Project Name"
                                           name="projectName"
                                           value={this.state.projectName}
                                           onChange={this.handleChange}
                                    />
                                    {errors.projectName && (
                                        <div className="invalid-feedback">
                                            {errors.projectName}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <h5>Project ID</h5>
                                    <input
                                        type="text"
                                        className={ classname("form-control form-control-lg"
                                            , {"is-invalid" : errors.projectIdentifier})}
                                        placeholder="Unique Project ID"
                                        name="projectIdentifier"
                                        value={this.state.projectIdentifier}
                                        onChange={this.handleChange}
                                    />
                                    {errors.projectIdentifier && (
                                    <div className="invalid-feedback">
                                        { errors.projectIdentifier }
                                </div>
                                )}
                                </div>
                                <div className="form-group">
                                    <h5>Project Description</h5>
                                    <textarea
                                        className={ classname("form-control form-control-lg"
                                            , {"is-invalid" : errors.description})}                                        placeholder="Project Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    />
                                    {errors.description  && (
                                        <div className="invalid-feedback">
                                            {  errors.description  }
                                        </div>
                                    )}

                                </div>
                                <h5>Start Date</h5>
                                <div className="form-group">
                                    <input type="date"
                                           className="form-control form-control-lg"
                                           name="start_date"
                                           value={this.state.start_date}
                                           onChange={this.handleChange}
                                    />
                                </div>
                                <h5>Estimated Completion Date</h5>
                                <div className="form-group">
                                    <input type="date"
                                           className="form-control form-control-lg"
                                           name="end_date"
                                           value={this.state.end_date}
                                           onChange={this.handleChange}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-dark btn-block"
                                    value="Create Project"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddProject.propTypes = {
    createProject : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired
}

const propsToState = state => ({
    errors : state.errors
})
export default connect(propsToState , {createProject}) (AddProject);
import React, {Component} from 'react';
import './App.css';
import Nav from "./components/Nav";
import AddTask from "./components/AddTask";
import {BrowserRouter, Route} from "react-router-dom";
import AddProject from "./components/AddProject";
import {Provider} from 'react-redux'
import store from "./store";
import UpdateProject from "./components/UpdateProject";
import DashBoard from "./components/DashBoard";
import ProjectBoard from "./components/ProjectBoard";
import UpdateTask from "./components/UpdateTask";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Nav />
                        <Route exact path="/db" component={DashBoard} />
                        <Route exact path="/addProject" component={AddProject} />
                        <Route exact path="/updateProject/:id" component={UpdateProject} />
                        <Route exact path="/pb/:id" component={ProjectBoard} />
                        <Route
                            exact
                            path="/addTask/:id"
                            component={AddTask}
                        />
                        <Route
                            exact
                            path="/updateTask/:backlog_id/:pt_id"
                            component={UpdateTask}
                        />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
export default App;

import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LogInPage from './LogInPage';
import HomePageContainer from "./HomePageContainer";

import EmployeeProfile from "./EmployeeProfile";
import AdminHomePage from "./AdminHomePage";
import EmployeeHomePage from "./EmployeeHomePage";


class Router extends Component {
    //CHECKING IF THE USER IS LOGGED IN BY CHECKING LOCALSTORAGE FOR TOKEN
    constructor() {
        super();
        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            is_loading: true,
            api: 'http://localhost:8000/'

        };
    }


    render() {
        return (
            <div className="App">
                <BrowserRouter>

                    <Route
                        exact
                        path={"/"}
                        render={props => (
                            <LogInPage
                                handle_login={this.handle_login}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={"/home"}
                        render={props => (
                            <EmployeeHomePage
                                logged_in={this.state.logged_in}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={"/team"}
                        render={props => (
                            <AdminHomePage
                                logged_in={this.state.logged_in}
                            />
                        )}
                    />
                    <Route exact path={"/employee/:id"} component={EmployeeProfile}/>


                </BrowserRouter>
            </div>
        );
    }
}

export default (Router);

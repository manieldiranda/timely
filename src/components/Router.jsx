import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';
import LogInPage from './LogInPage';
import EmployeeHomePage from "./EmployeeHomePage";
import axios from "axios";
import HomePageContainer from "./HomePageContainer";

import EmployeeProfile from "./EmployeeProfile";

const BASE_API_URL = process.env.REACT_APP_BASE_URL;

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
                        path={"/home/"}
                        render={props => (
                            <HomePageContainer
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

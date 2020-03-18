import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {withRouter} from "react-router-dom";
import '../css/NavBar.css';

const BASE_API_URL = process.env.REACT_APP_BASE_URL;
const BUILD_VERSION = process.env.REACT_APP_PROJECT_ENV;

class NavBar extends Component {


    //takes you back to homepage, which removes token AKA logging you out
    logOutButtonClick = (e) => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div>

                <Navbar bg="dark" variant="dark" expand="lg">
                    <LinkContainer to="/home">
                        <Navbar.Brand>Timely</Navbar.Brand>
                    </LinkContainer>
                    <Nav className={"mr-auto"}>


                    </Nav>

                    { BUILD_VERSION == "Development" ? ( <Badge className={"devFlag"} variant="info">Development</Badge>) : null }

                    {this.props.logged_in == true ? (
                        <Button onClick={this.logOutButtonClick} variant="outline-primary" size="sm">
                            Log Out
                        </Button>) : (null)}


                </Navbar>


            </div>
        );
    }
}

NavBar.propTypes = {};

export default withRouter(NavBar);
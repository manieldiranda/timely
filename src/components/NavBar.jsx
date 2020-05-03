import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import {withRouter} from "react-router-dom";
import '../css/NavBar.css';


class NavBar extends Component {


    //takes you back to homepage, which removes token AKA logging you out
    logOutButtonClick = (e) => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div>

                <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
                    <LinkContainer to="/home">
                        <Navbar.Brand>Timely</Navbar.Brand>
                    </LinkContainer>
                    <Nav className={"mr-auto"}>


                    </Nav>



                    {this.props.logged_in === true ? (
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

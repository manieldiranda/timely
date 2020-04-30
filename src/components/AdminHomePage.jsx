import React, {Component} from 'react';
import NavBar from "./NavBar";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import '../css/AdminHomePage.css';
import EmployeeProfileCard from "./EmployeeProfileCard";


import PropTypes from 'prop-types';
import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Moment from "react-moment";
import Alert from "react-bootstrap/Alert"
import Spinner from 'react-bootstrap/Spinner'
import {motion} from "framer-motion";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const BASE_API_URL = process.env.REACT_APP_BASE_URL;


class AdminHomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            api: 'http://localhost:8000/',
            loading: true,
            employeeData: []

        }

    }


    componentDidMount() {
        this.getEmployeeInfo();
    }

    getEmployeeInfo = () => {

        axios.get(`${BASE_API_URL}api/employees/`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                let employeeData = response.data;
                this.setState({
                    employeeData: employeeData
                });

            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            });
    };


    render() {
        return (

            <div>
                <motion.div
                    initial={{y: -100}}
                    animate={{y: -0}}
                    transition={{duration: 1}}
                >

                    <NavBar logged_in={this.props.logged_in}/>
                </motion.div>

                <Card className="adminPanelCard">
                    <Card.Body>
                        {this.state.loading === true ? (
                            <div className={'loadingSpinnerContainer'}>
                                <Spinner className={'loadingSpinner'} animation="border" variant="primary"/>
                            </div>

                        ) : (

                            <div className={'adminContentContainer'}>
                                <h2> Welcome to Timely, Admin. {this.props.first_name} </h2>
                                <Card.Text>
                                    <h3> Here is your team: </h3>
                                    <h6> Please select someone to make changes </h6>
                                </Card.Text>


                                {/*<Container className={'cardContainer'}>*/}
                                {/*    <Row>*/}
                                {/*        <Col className={'column1'} sm={8}>*/}
                                {/*            <Card>*/}
                                {/*                <Card.Body>This is some text within a card body.</Card.Body>*/}
                                {/*            </Card>*/}


                                {/*        </Col>*/}
                                {/*        <Col className={'column2'} sm={4}>*/}
                                {/*    <Card>*/}
                                {/*                <Card.Body>This is some text within a card body.</Card.Body>*/}
                                {/*            </Card>*/}

                                {/*        </Col>*/}
                                {/*    </Row>*/}
                                {/*</Container>*/}


                                {this.state.employeeData.map(employeeInfo => {
                                    const {first_name, last_name, is_super_user, employee_id} = employeeInfo;

                                    return (

                                        <EmployeeProfileCard employee_id={employee_id} first_name={first_name}
                                                             last_name={last_name} is_super_user={is_super_user}/>

                                    )
                                })}
                            </div>

                        )}


                    </Card.Body>
                </Card>
            </div>
        )
            ;
    }
}

AdminHomePage.propTypes = {};

export default AdminHomePage;

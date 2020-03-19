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
import Alert from "react-bootstrap/Alert";

const BASE_API_URL = process.env.REACT_APP_BASE_URL;


class AdminHomePage extends Component {

     constructor(props) {
        super(props);

        this.state = {
            api: 'http://localhost:8000/',
            employeeData:[]

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
                console.log(this.state.employee)
            });
    };




    render() {
        return (
            <div>
                <NavBar logged_in={this.props.logged_in}/>
                <Card className="adminPanelCard" bg="dark" text="white" style={{width: '50%'}}>
                    <Card.Header> <h2> Welcome to Timely, Admin. {this.props.first_name} </h2></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                             <h3> Here is your team: </h3>
                                <h6> Please select someone to make changes </h6>
                            </Card.Text>




      {this.state.employeeData.map(employeeInfo => {
                                            const {first_name, last_name, is_super_user, employee_id} = employeeInfo;

                                            return (

         <EmployeeProfileCard employee_id={employee_id} first_name={first_name} last_name={last_name} is_super_user={is_super_user}/>

                                            )
                                        })}




                        </Card.Body>
                    </Card>
            </div>
        );
    }
}

AdminHomePage.propTypes = {};

export default AdminHomePage;

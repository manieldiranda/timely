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
import {Panel} from "primereact/panel";
import {Chart} from "primereact/chart";

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

                const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label:'4/4/2020',
                    data: [25, 40, 30, 40, 15, 20, 12],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#8285f8",
                        "#3072f2",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#8285f8",
                        "#3072f2",
                    ]
                }]
        };
        return (

            <div>
                <motion.div
                    initial={{y: -100}}
                    animate={{y: -0}}
                    transition={{duration: 1}}
                >

                    <NavBar logged_in={this.props.logged_in}/>
                </motion.div>

                <div className="adminPanelCard">
                        {this.state.loading === true ? (
                            <div className={'loadingSpinnerContainer'}>
                                <Spinner className={'loadingSpinner'} animation="border" variant="primary"/>
                            </div>

                        ) : (

                            <div className={'adminContentContainer'}>
                                <h2> Welcome to Timely, Admin. {this.props.first_name} </h2>

<br/>
                                <Container>
                                    <Row>
                                        <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                            <Panel header="Days Scheduled">
                                                <Chart type="bar" data={data} options={{legend:{display: false}}}/>

                                            </Panel>
                                        </Col>
                                        <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                            <Panel header="Avg hours scheduled">
                                                <Chart type="line" data={data} options={{legend:{display: false}}}/>

                                            </Panel>
                                        </Col>
                                        <Col className={'graphColumn'} xs={12} sm={12} md={12} lg={4}>
                                            <Panel header="Num hours per week">
                                                <Chart type="pie" data={data} options={{legend:{display: false}}}/>

                                            </Panel>
                                        </Col>
                                    </Row>

                                </Container>
                                    <h3> Here is your team: </h3>
                                    <h6> Please select someone to make changes </h6>

                                <div>

                                    {this.state.employeeData.map(employeeInfo => {
                                        const {first_name, last_name, is_super_user, employee_id} = employeeInfo;

                                        return (

                                            <EmployeeProfileCard employee_id={employee_id} first_name={first_name}
                                                                 last_name={last_name} is_super_user={is_super_user}/>

                                        )
                                    })}
                                </div>
                            </div>
                        )}


                </div>
            </div>
        )
            ;
    }
}

AdminHomePage.propTypes = {};

export default AdminHomePage;

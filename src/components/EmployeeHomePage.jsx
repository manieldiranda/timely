import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/EmployeeHomePage.css';
import NavBar from "./NavBar";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap';
import Moment from 'react-moment';
import Alert from 'react-bootstrap/Alert'
import axios from "axios";
import Collapse from 'react-bootstrap/Collapse'

const BASE_API_URL = process.env.REACT_APP_BASE_URL;


class EmployeeHomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            api: 'http://localhost:8000/',
            logged_in: localStorage.getItem('token') ? true : false,
            profile: {
                time_entries: ['']
            }
        }

        var moment = require('moment');
    }

    componentDidMount() {
        if (this.state.logged_in === true) {
            this.getUserInfo();


        } else {
            this.setState({is_loading: false});
        }

    }

    getUserInfo = () => {

        axios.get(`${BASE_API_URL}timely_backend/current_user/`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                let currentUserInfo = response.data;
                this.setState({
                    first_name: currentUserInfo.first_name,
                    profile_id: currentUserInfo.id,
                    is_loading: false,
                });

            })
            .finally(() => {
                this.getProfileInfo();
            });
    };

    getProfileInfo = () => {
        axios.get(`${BASE_API_URL}api/employees/${this.state.profile_id}/`, {
            params: {}
        })
        //setting profile information in state
            .then(response => {
                let profile = response.data;
                this.setState({profile: profile}); //preferredName = profile['preferred_name']
            })
            //if theres an error console log it
            .catch(error => {
                console.log(error);
            })
            //After everything, set is-loading to false (removes loading spinner)
            .finally(() => {
                this.setState({is_loading: false});

            });


    }


    clockIn = () => {
        var moment = require('moment');
        let todaysDate = moment().format('YYYY-MM-DD')
        console.log(todaysDate);
        let employee_id = this.state.profile_id;


        let timeEntryData = {
            "date": todaysDate,
            "late": false,
            "employee": employee_id,
            // "proficiency_rating": rating,
        }

        console.log(timeEntryData)
        axios.post(`${BASE_API_URL}api/time_entries/`, timeEntryData, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                console.log(response);
                this.setState({
                    latest_time_entry_id: response.data.time_entry_id

                })

            })


            .finally((response) => {
                let employeeProfileUpdateData = {
                    "clocked_in": true,
                    "current_shift": this.state.latest_time_entry_id
                    // "proficiency_rating": rating,
                }
                axios.patch(`${BASE_API_URL}api/employees/${this.state.profile_id}/`, employeeProfileUpdateData, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
                    .then((response) => {
                        console.log(response);
                        this.getProfileInfo();

                    })

                    .catch((error) => {
                        console.log(error);
                        console.log(error.response);
                    });


            })
    }


    clockOut = () => {
        var moment = require('moment');
        let todaysDateAndTime = moment();
        console.log(todaysDateAndTime);

        let clockOutData = {
            "clock_out": todaysDateAndTime,
        }
        axios.patch(`${BASE_API_URL}api/time_entries/${this.state.profile.current_shift}/`, clockOutData, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                console.log(response);

            })
            .finally((response) => {
                let employeeProfileUpdateData = {
                    "clocked_in": false,
                    "current_shift": this.state.latest_time_entry_id
                    // "proficiency_rating": rating,
                }
                axios.patch(`${BASE_API_URL}api/employees/${this.state.profile_id}/`, employeeProfileUpdateData, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
                    .then((response) => {
                        console.log(response);
                        this.getProfileInfo();

                    })

                    .catch((error) => {
                        console.log(error);
                        console.log(error.response);
                    });


            })
    }


    render() {

        return (
            <div>
                <NavBar logged_in={this.state.logged_in}/>
                {this.state.logged_in === true ? (
                        <Card className="logInFormCard" bg="dark" text="white" style={{width: '50%'}}>
                            <Card.Header><h3> Welcome to Timely, {this.state.first_name}! </h3></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Please select what you would like to do:
                                </Card.Text>
                                <div className={"timeEntryButtons"}>
                                    <div className={"timeEntryButtonsContainer"}>
                                        {this.state.profile.clocked_in == true ? (
                                            <Button variant="primary" size="lg" disabled>
                                                Clocked In
                                            </Button>) : (
                                            <Button onClick={this.clockIn} className={"timeEntryButton"} variant="primary"
                                                    size="lg">
                                                Clock In
                                            </Button>)}

                                        <Button onClick={this.clockOut} className={"timeEntryButton"} variant="secondary"
                                                size="lg">
                                            Clock Out
                                        </Button>
                                    </div>
                                </div>
                                <div className={"previousShifts"}>
                                    <h1> Previous Shifts: </h1>
                                    <Accordion className={"timeEntryAccordion"}>

                                        {this.state.profile.time_entries.map(timeEntryInfo => {
                                            const {date, clock_in, clock_out, late, time_entry_id} = timeEntryInfo;

                                            return (

                                                <Card>
                                                    <Accordion.Toggle date={date} clock_in={clock_in}
                                                                      clock_out={clock_out} late={late}
                                                                      time_entry_id={time_entry_id} as={Card.Header}
                                                                      eventKey={time_entry_id}>
                                                        <Moment
                                                            format="MM/DD/YYYY">{date}</Moment>
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey={time_entry_id}>
                                                        <Card.Body>
                                                            <div className={"timeEntryDetailContainer"}>
                                                                <div className={"clockIn timeEntryDetail"}>
                                                                    <h6><b> Clock In:</b></h6>
                                                                    <Moment
                                                                        format="hh:mm A">{clock_in}</Moment>
                                                                </div>
                                                                <div className={"clockOut timeEntryDetail"}>
                                                                    <h6><b> Clock Out:</b></h6>
                                                                    { clock_out == null? (<p> Pending </p> ) : ( <Moment
                                                                        format="hh:mm A">{clock_out}</Moment>) }


                                                                </div>
                                                                <div className={"late timeEntryDetail"}>

                                                                    {`${this.props.late}` == true ? (
                                                                        <div className={'alertContainer'}>
                                                                            <Alert className={"lateAlert"}
                                                                                   variant={'danger'}>
                                                                                Late
                                                                            </Alert>
                                                                        </div>) : (
                                                                        <div className={'alertContainer'}><Alert
                                                                            className={"lateAlert"} variant={'info'}>
                                                                            On Time
                                                                        </Alert>
                                                                        </div>)}
                                                                </div>

                                                            </div>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>

                                            )
                                        })}
                                    </Accordion>
                                </div>
                            </Card.Body>
                        </Card>
                    )

                    : (<Card className="logInFormCard" bg="dark" text="white" style={{width: '50%'}}>
                        <Card.Header>Log-In Required</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                You need to be logged-in to access this page.
                            </Card.Text>
                            <LinkContainer to="/">
                                <Button variant="primary" type="submit">
                                    Log In
                                </Button>
                            </LinkContainer>

                        </Card.Body>
                    </Card>)

                }
            </div>
        );
    }
}


export default EmployeeHomePage;
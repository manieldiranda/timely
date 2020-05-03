import React, {Component} from 'react';
import '../css/EmployeeHomePage.css';
import NavBar from "./NavBar";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap';
import Moment from 'react-moment';
import Alert from 'react-bootstrap/Alert'
import axios from "axios";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
                        <div className={'employeeContentContainer'}>
                            <h1> Welcome to Timely, {this.state.first_name}! </h1>
                            Please select what you would like to do:
                            <div className={"timeEntryButtons"}>
                                <div className={"timeEntryButtonsContainer"}>


                                </div>
                                <Container>
                                    <Row>
                                        <Col className={'leftButtonColumn'} sm={12}
                                             md={6}>  {this.state.profile.clocked_in === true ? (
                                            <Button variant="primary" className={"timeEntryButton"} size="lg" disabled>
                                                Clocked In
                                            </Button>) : (
                                            <Button onClick={this.clockIn} className={"timeEntryButton"} variant="primary"
                                                    size="lg">
                                                Clock In
                                            </Button>)}
                                        </Col>
                                        <Col className={'rightButtonColumn'} sm={12} md={6}>

                                            {this.state.profile.clocked_in === false ? (
                                                <Button variant="secondary" className={"timeEntryButton"} size="lg"
                                                        disabled>
                                                    Clocked Out
                                                </Button>) : (
                                                <Button onClick={this.clockOut} className={"timeEntryButton"}
                                                        variant="secondary"
                                                        size="lg">
                                                    Clock Out
                                                </Button>)}

                                        </Col>
                                    </Row>

                                </Container>


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
                                                    {/*only displays on mobile*/}
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey={time_entry_id}>
                                                    <Card.Body>
                                                        <Container>
                                                            <Row className={'timeEntryDetailContainer'}>
                                                                <Col className={'timeEntryDetailColumn'} xs={12} md={3}>

                                                                    <h6><b> Clock In:</b></h6>
                                                                    <Moment
                                                                        format="hh:mm A">{clock_in}</Moment>

                                                                </Col>
                                                                <Col className={'timeEntryDetailColumn'} xs={12} md={3}>
                                                                    <h6><b> Clock Out:</b></h6>
                                                                    {clock_out === null ? (<p> Pending </p>) : (<Moment
                                                                        format="hh:mm A">{clock_out}</Moment>)}


                                                                </Col>
                                                                <Col className={'timeEntryDetailColumn'} xs={12} md={6}>

                                                                    {`${this.props.late}` === true ? (
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

                                                                        </div>
                                                                    )}


                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>


                                        )
                                    })}
                                </Accordion>


                            </div>
                        </div>
                    )

                    : (
                        <div>
                            <h1>Log-In Required</h1><p>
                            You need to be logged-in to access this page.
                        </p>
                            <LinkContainer to="/">
                                <Button variant="primary" type="submit">
                                    Log In
                                </Button>
                            </LinkContainer>

                        </div>
                    )

                }
            </div>
        );
    }
}


export default EmployeeHomePage;
